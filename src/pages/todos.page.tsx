import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "@/features/todos/queries/getTodos"
import { Button, Checkbox, Input, List, Loader, Text } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import { Suspense, useState } from "react"
import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import { Horizontal, Vertical } from "mantine-layout-components"
import toggleTodo from "@/features/todos/mutations/toggleTodo"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import cleanCompleted from "@/features/todos/mutations/cleanCompleted"
import { ReactFC } from "~/types"
import { PromiseReturnType } from "blitz"
import { TodoInput } from "@/features/todos/schemas"
import { z } from "zod"
import { useForm, zodResolver } from "@mantine/form"

type Todos = PromiseReturnType<typeof getTodos>
type TodoType = Todos[0]

const Todo: ReactFC<{
  todo: TodoType
}> = ({ todo }) => {
  const [$toggleTodo] = useMutation(toggleTodo)

  return (
    <Horizontal>
      <Checkbox
        checked={todo.done}
        onClick={async () => {
          await $toggleTodo({ id: todo.id })
        }}
      />
      <Text>{todo.title}</Text>
    </Horizontal>
  )
}

type TodoFormType = z.infer<typeof TodoInput>

const Todos = () => {
  const user = useCurrentUser()
  const [todos] = useQuery(getTodos, {})
  const [todoTitle, setTodoTitle] = useState("")
  const [$addTodo] = useMutation(addTodo, {})
  const [$cleanCompleted] = useMutation(cleanCompleted, {})

  const form = useForm<TodoFormType>({
    validate: zodResolver(TodoInput),
  })

  return (
    <Vertical>
      {user && <Text>Hi, {user.name}, here are your todos:</Text>}
      <form
        onSubmit={form.onSubmit(async (values) => {
          await $addTodo({ ...values })
        })}
      >
        <Input
          value={todoTitle}
          placeholder="Enter todo title"
          onChange={(e) => {
            setTodoTitle(e.target.value)
          }}
        />
        <Button
          onClick={async () => {
            const result = await $addTodo({ title: todoTitle })
          }}
        >
          Add Todo
        </Button>
      </form>
      <Button
        onClick={async () => {
          const result = await $cleanCompleted({})
        }}
      >
        Clean completed
      </Button>
      <List>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </List>
    </Vertical>
  )
}

export const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Todos />
    </Layout>
  )
}

export default TodosPage

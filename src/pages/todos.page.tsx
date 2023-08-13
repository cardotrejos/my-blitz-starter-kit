import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "@/features/todos/queries/getTodos"
import { Button, Checkbox, Input, List, Loader, Text } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import { Suspense, useState } from "react"
import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import { notifications } from "@mantine/notifications"
import { Horizontal, Vertical } from "mantine-layout-components"
import toggleTodo from "@/features/todos/mutations/toggleTodo"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import cleanCompleted from "@/features/todos/mutations/cleanCompleted"

const Todo = ({ todo }) => {
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
const Todos = () => {
  const user = useCurrentUser()
  const [todos, { refetch }] = useQuery(getTodos, {})
  const [todoTitle, setTodoTitle] = useState("")
  const [$addTodo] = useMutation(addTodo, {})
  const [$cleanCompleted] = useMutation(cleanCompleted, {})

  return (
    <Vertical>
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
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Layout>
  )
}

export default TodosPage

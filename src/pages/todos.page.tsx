import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "@/features/todos/queries/getTodos"
import { Button, Input, List, Loader, Text } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import { Suspense, useState } from "react"
import Layout from "@/core/layouts/Layout"
import addTodo from "@/features/todos/mutations/addTodo"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"

const Todos = () => {
  const [todos] = useQuery(getTodos, {})

  const [todoTitle, setTodoTitle] = useState("")

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Todo task added!",
        message: `${todo.title}`,
      })
    },
  })

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
      <List>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            <Text key={todo.id}>{todo.title}</Text>
          </List.Item>
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

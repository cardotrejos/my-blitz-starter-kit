import { useQuery } from "@blitzjs/rpc"
import getTodos from "@/features/todos/queries/getTodos"
import { List, Loader, Text } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "@/core/layouts/Layout"

const Todos = () => {
  const [todos] = useQuery(getTodos, {})

  return (
    <List>
      {todos.map((todo) => (
        <List.Item key={todo.id}>
          <Text key={todo.id}>{todo.text}</Text>
        </List.Item>
      ))}
    </List>
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

import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})
export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  const todos = [
    {
      id: 1,
      text: "Do laundry",
      done: false,
    },
    {
      id: 2,
      text: "Do dishes",
      done: true,
    },
    {
      id: 3,
      text: "Do homework",
      done: false,
    },
    {
      id: 4,
      text: "Do homework",
      done: false,
    },
    {
      id: 5,
      text: "Do homework",
      done: false,
    },
  ]

  return todos
})

import { Hono } from 'hono'

type Bindings = {
   STORAGE_DEV1_BUCKET: R2Bucket
}


const app = new Hono<{ Bindings: Bindings }>()

app.post('/upload', (c) => {
  const fileUrl = c.req.query('fileUrl')

  return c.text('Hello Hono!')
})

export default app

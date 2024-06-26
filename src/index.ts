import { Hono } from "hono";

type Bindings = {
  STORAGE_DEV1_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/upload", (c) => {
  const fileUrl = c.req.query("fileUrl");
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(2, 12);
  const fileName = `${timestamp}.mp3`;

  return c.text("Hello Hono!");
});

export default app;

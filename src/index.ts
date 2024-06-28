import { Hono } from "hono";

type Bindings = {
  STORAGE_DEV1_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/upload", async (c) => {
  const body = await c.req.json();
  const fileUrl = body.fileUrl;

  if (!fileUrl) {
    return c.text('Missing MP3 URL', 400)
  }

  const directory = 'gd'
  const url = new URL(fileUrl);
  const fileName = `${directory}/${url.pathname.split('/').pop()}`;
  if (!fileName) {
    return c.text('Invalid file URL', 400);
  }

  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  try {
    const uploadResult = await c.env.STORAGE_DEV1_BUCKET.put(fileName, response.body, {
      httpMetadata: {
        contentType: 'audio/mpeg',
      },
    })
    if (!uploadResult.uploaded) {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file', error);
    throw new Error('Failed to upload file');
  }

  return c.json({ message: "Upload done.", fileName: `${fileName}` });
});

export default app;

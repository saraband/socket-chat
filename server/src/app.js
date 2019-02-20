import express from 'express';
import helmet from 'helmet';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

app.get('/foo', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.end('bar');
});

app.get('*', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.end('Hello world');
});

export default app;
import express from 'express';
import helmet from 'helmet';
import graphQLHttp from 'express-graphql';
import schema from './schemas';
import cors from 'cors';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

/* GRAPHQL */
app.use(cors);
app.use('/graphql', graphQLHttp({
  schema,
  pretty: true,
  graphiql: true
}));

app.get('/foo', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.end('bar');
});

app.get('*', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.end('Hello world');
});

export default app;

import express from 'express';

const App = express();

App.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world');
});

export default App;
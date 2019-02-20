import App from './App';

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
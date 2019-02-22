import app from './app';
import { SOCKET_PORT } from 'SHARED/constants';
import roomsManager from './roomsManager';

const PORT = process.env.PORT || 3000;

roomsManager.listen(SOCKET_PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

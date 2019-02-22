import app from './app';
import chatManager from './chatManager';
import { SOCKET_PORT } from '../../shared/constants';

const PORT = process.env.PORT || 3000;

chatManager.listen(SOCKET_PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

import app from './app';
import ChatManager from './components/ChatManager';
import { SOCKET_PORT } from '../../shared/constants';

const PORT = process.env.PORT || 3000;
const chatManager = new ChatManager;

chatManager.listen(SOCKET_PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

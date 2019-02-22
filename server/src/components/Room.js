import { Events } from 'SHARED/constants';
import db from '../models';

export default class Room {
  constructor ({ id, name }, io) {
    this.id = id;
    this.name = name;
    this.usersCount = 0;

    // Setup connection to this room
    this.io = io
      .of(`/${id}`)
      .on('connection', (socket) => {
        ++this.usersCount;
        console.log(`[+] A client joined room #${name} (id: ${id})`);

        // Configure socket
        socket.on(Events.SEND_MESSAGE, async (data) => {
          try {
            // Commit message to DB
            const parsedData = JSON.parse(data)
            const createdMessage = await this.sendMessageDB(parsedData);

            // Emit message to all people of the room
            io.of(id).emit(Events.RECEIVE_MESSAGE, JSON.stringify({
              ...parsedData,
              id: createdMessage.id
            }));
          } catch (err) {
            // TODO logger
          }
        });

        /* DISCONNECTION */
        socket.on('disconnect', () => {
          --this.usersCount;
          console.log(`[-] A client left room #${name} (id: ${id})`);
        });
      });
  }

  sendMessageDB = ({ username, content }) => {
    // TODO validate args
    return db.message.create({
      roomId: this.id,
      username,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
};

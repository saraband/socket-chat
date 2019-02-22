import app from '../app';
import db from '../models';
const server = require('http').Server(app);
const io = require('socket.io')(server);
import { Events } from '../../../shared/constants';

export default class ChatManager {
  constructor () {
    this.setup();
  }

  setup = async () => {
    const rooms = await db.room.findAll({
      attributes: ['id', 'name']
    });
    console.log(`Retrieved ${rooms.length} room(s): ${[...rooms].map(({ name }) => `'${name}'`).join(', ')}`);

    this.rooms = {};
    rooms.forEach(({ id }) => {
      this.rooms[id] = io
        .of(`/${id}`)
        .on('connection', (socket) => {
          /**
           * SEND MESSAGE
           */
          socket.on(Events.SEND_MESSAGE, async (data) => {
            try {
              console.log(`[ROOM ${id}] ${Events.SEND_MESSAGE} ${data}`);
              const parsedData = JSON.parse(data)

              // Commit message to DB
              const createdMessage = await this.commitSendMessage(id, parsedData);

              // Emit message to all people of the room
              io.of(id).emit(Events.RECEIVE_MESSAGE, JSON.stringify({
                ...parsedData,
                id: createdMessage.id
              }));
            } catch (err) {
              // TODO logger
            }
          });

          /**
           * DISCONNECT
           */
          socket.on('disconnect', () => {

          });
      });
    })
  };

  commitSendMessage = (roomId, { username, content }) => {
    // TODO validate args
    return db.message.create({
      roomId,
      username,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  listen (port) {
    server.listen(port);
  }
}

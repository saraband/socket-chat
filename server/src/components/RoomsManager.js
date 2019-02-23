import db from 'MODELS';
import Room from 'COMPONENTS/Room';
import app from 'ROOT/app';

const server = require('http').Server(app);
const io = require('socket.io')(server);

export default class RoomsManager {
  constructor () {
    this.loadRoomsFromDB();
  }

  loadRoomsFromDB = async () => {
    const rooms = await db.room.findAll({
      attributes: ['id', 'name']
    });
    // TODO: logger
    console.log(`Retrieved ${rooms.length} room(s): ${[...rooms].map(({ name }) => `'${name}'`).join(', ')}`);

    this.rooms = {};
    rooms.forEach((roomData) => {
      this.addRoom(roomData);
    });
  };

  getRoom = (id) => {
    return this.rooms[id];
  };

  addRoom = (roomData) => {
    this.rooms[roomData.id] = new Room(roomData, io);
  };

  listen = (port) => {
    server.listen(port);
  };
};

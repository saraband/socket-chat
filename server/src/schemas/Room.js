import db from 'MODELS';
import roomsManager from 'ROOT/roomsManager';
import { Op } from 'sequelize';

const typeDefs = `
  type Message {
    id: ID!
    roomId: ID!
    createdAt: String!
    username: String!
    content: String!
  }

  type Room {
    id: ID!
    name: String!
    usersConnected: Int!
    messages (last: Int = 5): [Message!]!
  }
  
  extend type Mutation {
    createRoom (name: String!): Room
  }
  
  extend type Query {
    roomsList: [Room!]!
  }
`;

const resolvers = {
  Room: {
    usersConnected: (room) => roomsManager.getRoom(room.id).usersCount,
    messages: (room, { last }) => {
      return db.message.findAll({
        where: {
          roomId: {
            [Op.eq]: room.id
          }
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
    }
  },
  Query: {
    roomsList: () => db.room.findAll()
  },
  Mutation: {
    createRoom: async (_, { name }) => {
      // Create room in db if it is valid (i.e. non already-existing)
      console.log('Creating room ', name);
      const [ room, hasBeenCreated ] = await db.room.findOrCreate({
        where: {
          name: {
            [Op.eq]: name
          }
        },
        defaults: {
          name,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      if (!hasBeenCreated) {
        return null;
      }

      // Add it to the room manager
      roomsManager.addRoom(room);

      return room;
    }
  }
};

export default {
  typeDefs,
  resolvers
};

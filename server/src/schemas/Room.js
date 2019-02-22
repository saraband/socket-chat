import db from 'MODELS';
import roomsManager from 'ROOT/roomsManager';

const typeDefs = `
  type Room {
    id: ID!
    name: String!
    usersConnected: Int!
    price: Int!
  }
  
  extend type Query {
    roomsList: [Room!]!
  }
`;

const resolvers = {
  Room: {
    usersConnected: (room) => roomsManager.getRoom(room.id).usersCount
  },
  Query: {
    roomsList: () => db.room.findAll()
  }
};

export default {
  typeDefs,
  resolvers
};

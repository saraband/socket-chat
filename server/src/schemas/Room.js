import db from '../models';
import chatManager from '../chatManager';

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
    usersConnected: (room) => chatManager.rooms[room.id].count
  },
  Query: {
    roomsList: () => db.room.findAll()
  }
};

export default {
  typeDefs,
  resolvers
};

import db from '../models';

const typeDefs = `
  type Room {
    id: ID!
    name: String!
    price: Int!
  }
  
  extend type Query {
    roomsList: [Room!]!
  }
`;

const resolvers = {
  Query: {
    roomsList: () => db.room.findAll()
  }
};

export default {
  typeDefs,
  resolvers
};
import merge from 'lodash/merge';
import { makeExecutableSchema } from 'graphql-tools';
import Room from './Room';

const typeDefs = [`
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`];

/**
 *  Merge all typeDefs and resolvers to build schema
 *
 */

const modules = [
  Room
];

export default makeExecutableSchema({
  resolvers: merge(...modules.map((module) => module.resolvers)),
  typeDefs: typeDefs.concat(modules.map((module) => module.typeDefs))
});
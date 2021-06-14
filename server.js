const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs')

const { makeExecutableSchema } = require('graphql-tools');
const TopicAPI = require('./datasources/topic')
const resolvers = require('./resolvers');


const PORT = process.env.PORT||4000
const typeDefs = readFileSync('./schema.graphql').toString('utf-8')
// Construct a schema, using GraphQL schema language

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers
  });
 
  const server = new ApolloServer({
    schema: schema,
    dataSources: () => ({
        topicAPI: new TopicAPI(),
      })
  })
  
  server.listen({port:PORT}).then(({ url }) => {
    console.log(`Server ready at ${url}.`)
  })
 

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
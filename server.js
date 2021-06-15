const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const { readFileSync } = require('fs')
const app = express();

const { makeExecutableSchema } = require('graphql-tools');

const DocAPI = require('./datasources/doc')
const SearchEngineAPI = require('./datasources/searchengine')

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
        docAPI: new DocAPI(),
        searchEngineAPI: new SearchEngineAPI(),
      }),
    cacheControl: {
      defaultMaxAge: 10, // 5 seconds
    },
    introspection: true,
    playground: true,
    plugins: [responseCachePlugin()],
  })

  server.applyMiddleware({ app });
  
  app.listen({port: PORT}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
 

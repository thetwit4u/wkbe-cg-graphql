const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs')
const resolvers = require('./resolvers');
const axios = require('axios');

const PORT = process.env.PORT||4000
const typeDefs = fs.readFileSync("schema.graphql", {
    encoding: "utf8",
    flag: "r",
  });

// Construct a schema, using GraphQL schema language

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers,
  });
 

 
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(PORT||4000);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
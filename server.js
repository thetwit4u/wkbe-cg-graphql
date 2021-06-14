const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = process.env.PORT||4000

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    topics(contains: String!): [Topic]
  }

  type Topic {
      id: String!
      path: String
      label: String
  }

`);
 
// The root provides a resolver function for each API endpoint
const root = {
  topics: () => {
    return [
        {"id":1097,"path":"Oprichting / Oprichting van vennootschap / Oprichting via fusie","label":"Oprichting via fusie"},
        {"id":1098,"path":"Kost / Kost eigen aan de werkgever / Verplaatsingskost woon-werkverkeer","label":"Verplaatsingskost woon-werkverkeer"} 
    ];
  },
};
 
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT||4000);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
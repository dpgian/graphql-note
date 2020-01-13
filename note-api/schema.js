import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
    type Note {
        _id: ID!
        title: String!,
        date: Date,
        content: String!
    }

    scalar Date

    type Query {
        allNotes: [Note]
    }

`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema
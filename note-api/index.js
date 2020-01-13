import express from 'express';
import graphlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';

const dburi = 'mongodb+srv://dpgian:notepassword@note-db-5xspy.mongodb.net/test?retryWrites=true&w=majority'

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(dburi, { useNewUrlParser: true })
        console.log('Database connected..')
    } catch(err) {
        console.log('Error on database connection: ' +err)
        process.exit(1)
    }
}

connectDB()

// Express server

const app = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

// Server routes

app.get('/', (req, res) => {
    res.json({
        message: 'Note api'
    })
})

// GraphQL

app.use('/graphql', graphlHTTP({
    schema: schema,
    graphiql: true
    })
)

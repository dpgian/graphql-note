import express from 'express';
import mongoose from 'mongoose';

const dburi = 'mongodb+srv://dpgian:notepassword@note-db-5xspy.mongodb.net/test?retryWrites=true&w=majority'

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

const app = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.get('/', (req, res) => {
    res.json({
        message: 'Note api'
    })
})

//password: notepassword
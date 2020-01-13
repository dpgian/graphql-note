import express from 'express';

const app = express()
const PORT = 4000

app.get('/', (req, res) => {
    res.json({
        message: 'Note api'
    })
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

// vendor libraries
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')

const auth = require('./jwt-auth')
const schema = require('./schema/schema')



// database connection
mongoose.connect('mongodb+srv://lester:norahjones9@cluster0-qbpvb.mongodb.net/capstone3?retryWrites=true&w=majority',
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false}
)
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

// middlewares
app.use(cors())
app.use(bodyParser.json({ limit: '15mb' }))
app.use('/graphql', graphqlHTTP((req, res) => ({ 
    schema, 
    graphiql: true,
    context: {
        request: req,
        currentUser: auth.verify(req.headers.authorization)
    } 
})))
let PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})


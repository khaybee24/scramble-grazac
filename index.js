const express = require('express');
const app = express();
const game = require('./router/gameRouter');
const port = process.env.PORT || 4900;
const wordRouter = require('./router/wordRouter')
const connectDB = require('./Database/db')
const path = require('path')
const cors = require("cors");
const env = require('dotenv').config()
const morgan = require('morgan');



app.use(express.json());
app.use(cors({
    origin: 'https://your-frontend-domain.com', // Allow only your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(morgan('dev'));
app.use('/api/v1/game',game)
app.use('/api/v1/word', wordRouter)

connectDB()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/', (req, res) => {
    res.send('HomePage')
})

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:4900/`);
    
})
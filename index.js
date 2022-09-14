import express from 'express';
import bodyParser from 'body-parser';
import quotesRoutes from './routes/quotes.js';
import quotes from "./quotes-list.js";
import router from './routes/quotes.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use('/quotes', quotesRoutes);

app.use(cors({
    origin: '*',
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Hello from Homepage.')
});

// get random quote

router.get('/random', (req, res) => {
    res.send(getRandom())
})

function getRandom() {
    let index = Math.floor(Math.random() * (quotes.length - 1))
    return quotes[index]
}

// get all quotes about specific subject

router.get('/:subject', (req, res) => {
    res.send(getQuoteBySubject(req.params.subject))
})

function getQuoteBySubject(subject) {
    let subjectFound = quotes.filter((obj) => {
        return obj.subject === subject;
    })
    if (!subjectFound.length) return ('Sorry, not found. :(')
    return subjectFound;
}

// get quote by id

router.get('/id/:id', (req, res) => {
    res.send(getQuoteByID(req.params.id))
})

function getQuoteByID(id) {
    let IDFound = quotes.find((obj) => {
        return obj.id == id;
    })
    console.log(IDFound)
    if (!IDFound) return ('Sorry, not found. :(')
    return IDFound;
}

//

const refreshRandom = document.querySelector('.random .refresh')

refreshRandom.addEventListener('click', async function newRandomQuote() {
    let data = await fetch('https://isaboscov-api.herokuapp.com/quotes/random');
    let result = await data.json();
    console.log(result);
})

//

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port: http://localhost:5000`));
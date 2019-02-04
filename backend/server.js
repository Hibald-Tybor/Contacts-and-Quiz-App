const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 4000;
const dbPORT = 23456;

const contactRoute = express.Router();

const Contact = require('./contact.model');

app.use(cors());
app.use(bodyParser.json());
app.use("/contacts", contactRoute)

mongoose.connect(`mongodb://127.0.0.1:${dbPORT}/contacts`, {useNewUrlParser: true});

const { connection } = mongoose;

connection.once('open', () => {
    console.log("Successfully connected to the database");
})

contactRoute.route('/').get((req, res) => {
    Contact.find((err, contacts) => {
        if (err) {
            res.status(404).send('Contact not found')
        } else {
            res.json(contacts)
        }
    })
});


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})
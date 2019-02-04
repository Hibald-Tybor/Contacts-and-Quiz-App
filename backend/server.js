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

contactRoute.route('/add').post((req, res) => {
    let contact = new Contact(req.body);
    contact.save()
    .then((contact) => {
        res.status(201).send('Contact saved')
    })
    .catch((err) => {
        res.status(400).send('Invalid request')
    })
})

contactRoute.route('/update/:id').post((req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (!contact) {
            res.status(404).send('contact not found');
        } else {
            contact = Object.assign(contact, req.body);

            contact.save()
            .then(contact => {
                res.status(201).send('contact updated')
            })
            .catch(err => {
                res.status(400).send('update not possible')
            })
        }
    })
})

contactRoute.route('/delete/:id').delete((req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (!contact) {
            res.status(404).send('contact not found')
        } else {
            contact.delete()
            .then((response) => {
                res.status(200).send(response)
            })
            .catch((err) => {
                res.status(404).send(err)
            })
        }
    })
})


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})
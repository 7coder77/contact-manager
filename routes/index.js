const express = require('express');
const router = express.Router();

// In-memory data store (for demonstration purposes)
let contacts = [];

// GET all contacts
router.get('/contacts', (req, res) => {
    res.json(contacts);
});

// GET a single contact by ID
router.get('/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
});

// POST a new contact
router.post('/contacts', (req, res,next) => {
    try {
        const { name, email, phone } = req.body;
        
        if (!name || !email || !phone) {
            res.status(400);
            throw new Error('Please provide all required fields: name, email, and phone.');
        }

        const newContact = {
            id: contacts.length + 1,
            name,
            email,
            phone
        };

        contacts.push(newContact);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
});

// PUT (update) an existing contact by ID
router.put('/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    contact.name = req.body.name || contact.name;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;
    res.json(contact);
});

// DELETE a contact by ID
router.delete('/contacts/:id', (req, res) => {
    const contactIndex = contacts.findIndex(c => c.id === parseInt(req.params.id));
    if (contactIndex === -1) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    contacts.splice(contactIndex, 1);
    res.status(204).send();
});

module.exports = router;
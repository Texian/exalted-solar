//----------------------------------------------------- SETUP -----------------------------------------------------//
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');
const db = require('./models');

//----------------------------------------------------- MIDDLEWARE -----------------------------------------------------//
app.use(express.json());

//----------------------------------------------------- ROUTES -----------------------------------------------------//
//--------------------- Test server
app.get('/', (req, res) => {
    res.send('Praise the UCS');
});

//--------------------- API List
app.get('/api', (req, res) => {
    res.json({
        baseUrl: "http://localhost:4000",
        endpoints: [
            {method: "GET", path: "/api", description: "All endpoints"},
            {method: "GET", path: "/api/v1/Characters", description: "All Characters"},
            {method: "GET", path: "/api/v1/Characters/:id", description: "Specific character"},
            {method: "POST", path: "/api/v1/Characters", description: "Add character"},
            {method: "PUT", path: "/api/v1/Characters/:id", description: "Update character"},
            {method: "DELETE", path: "/api/v1/Characters/:id", description: "Delete character"},
        ]
    });
});

//--------------------- GET all - Index
app.get('/api/v1/characters', (req, res) => {
    db.Character.find().exec((err, characters) => {
        if (err) console.log(`Index error: ${err}`);
        res.json(characters);
    })
});

//--------------------- GET one - Show
app.get('/api/v1/characters/:id', (req, res) => {
    db.Character.findById({_id: req.params.id}, (err, data) => {
        if (err) console.log(`Show error: ${err}`);
        res.json(data);
    })
});

//--------------------- POST one - Create
app.post('/api/v1/characters/:id', (req, res) => {
    db.Character.create(req.body, (err, newCharacter) => {
        if (err) console.log(`Create error: ${err}`);
        res.json(newCharacter);
    })
});

//--------------------- PUT one - Update
app.put('/api/v1/characters/:id', (req, res) => {
    db.Character.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCharacter) => {
        if (err) console.log(`Update error: ${err}`);
        res.json(updatedCharacter);
    })
});

//--------------------- DELETE one - Destroy
app.delete('/api/v1/characters/:id', (req, res) => {
    db.Character.findByIdAndDelete(req.params.id, (err, deletedCharacter) => {
        if (err) console.log(`Destroy error: ${err}`);
        res.json(deletedCharacter);
    })
});

//----------------------------------------------------- START SERVER -----------------------------------------------------//
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
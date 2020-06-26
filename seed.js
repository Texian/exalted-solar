const db = require ('./models');
const { exists } = require('./models/Character');

const character_list = [
    {
        name: 'Felsic Ashlar',
        caste: 'Twilight',
        supernal: 'Craft',
        anima: 'Forge fire and clockwork',
        concept: 'Tinker and smith',
        description: 'Large red man',
        attributes:[
            {
                name: 'Strength',
                dots: 4,
                attributeType: 'Physical'
            }, {
                name: 'Dexterity',
                dots: 4,
                attributeType: 'Physical'
            }, {
                name: 'Stamina',
                dots: 3,
                attributeType: 'Physical'
            }, {
                name: 'Charisma',
                dots: 3,
                attributeType: 'Social'
            }, {
                name: 'Manipulation',
                dots: 2,
                attributeType: 'Social'
            }, {
                name: 'Appearance',
                dots: 2,
                attributeType: 'Social'
            }, {
                name: 'Perception',
                dots: 5,
                attributeType: 'Mental'
            }, {
                name: 'Intelligence',
                dots: 4,
                attributeType: 'Mental'
            }, {
                name: 'Wits',
                dots: 3,
                attributeType: 'Mental'
            }]
    }

];

const caste_list = [
    {name: 'Dawn'},
    {name: 'Zenith'},
    {name: 'Twilight'},
    {name: 'Night'},
    {name: 'Eclipse'},    
];

db.Caste.deleteMany({}, (err, castes) => {
    console.log(`Deleted all castes`);
    db.Caste.create(caste_list, (err, castes) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Created ${castes.length} castes.`);

        db.Character.deleteMany({}, (err, characters) => {
            console.log(`Deleted all characters`);
            character_list.forEach((characterData) => { //Must be the last step
                const character = new db.Character({
                    name: characterData.name,
                    caste: characterData.caste,
                    anima: characterData.anima,
                    description: characterData.description //TODO - add the rest
                });
                db.Caste.findOne({name: characterData.caste}, (err, foundCaste) => {
                    console.log(`Found character ${character.name} with the caste ${foundCaste.name}`);
                    if (err) {
                        console.log(err);
                        return;
                    }
                    character.caste = foundCaste;
                    character.save((err, savedCharacter) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`Saved ${savedCharacter.name} of ${foundCaste.name}`);
                        process.exit();
                    });
                });
            });
        });
    });
});
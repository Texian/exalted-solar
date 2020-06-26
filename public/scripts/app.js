const db = require("../../models");

let $characterList;
let allCharacters = [];

$(document).ready(function () {
    $characterList = $('#characterTarget');

    $.ajax({
        method: 'GET',
        url: '/api/characters',
        success: handleSuccess,
        error: handleError
    });

    $('#newCharcterForm').on('submit', function (e) {
        e.preventDefault();
        console.log('New character serialized', $(this).serializeArray());
        $.ajax({
            method: 'POST',
            url:'/api/characters',
            data: $(this).serializeArray(),
            success: newCharacterSuccess,
            error: newCharacterError
        });
    });

    $characterList.on('click', '.deleteBtn', function() {
        console.log(`Clicked delete button to', '/api/characters/` + $(this).attr('data-id'));
        $.ajax({
            method: 'DELETE',
            url: '/api/characters/' + $(this).attr('data-id'),
            success: deleteCharacterSuccess,
            error: deleteCharacterError
        });
    });

    $characterList.on('click', '.edit-character-button', function () {
        console.log(`Clicked edit button`);
        $(this).parent().find(".edit-input").show();
    });

    $characterList.on('click', '.edit-character-submit-button', function() {
        $(this).parent().hide();
        let newName = $(this).parent().find("input").val();
        $.ajax({
            method: 'PUT',
            url: `/api/characters/${$(this).attr('data-id')}`,
            data: {name: newName},
            success:  (character) => {
                $(this).parent().parent().find(".character-name").html(character.name);
            }
        })
    });

    $characterList.on('click', '#addAttributeForm', function(e) {
        e.preventDefault();
        console.log(`New attribute`);
        $.ajax({
            method: 'POST',
            url: '/api/characters/' + $(this).attr('data-id') + '/attributes/',
            data: $(this).serializeArray(),
            success: newAttributeSuccess,
            error: newAttributeError
        });
    });

    $characterList.on('click', '.deleteAttribute', function(){
        $.ajax({
            method: 'DELETE',
            url: '/api/characters/' + $(this).data('characterID') + '/attributes/' + $(this).data('attributeID'),
            success: deleteAttributeSuccess,
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    });
});

function getAttributeHtml(_character_id, attribute) {
    return `${Character.name} <button class="deleteAttribute btn btn-danger" data-characterID=${_character_id} data-attributeID=${attribute._id}><b>x</b></button>`;
}

function getAllAttributesHtml(_character_id, attributes) {
    if (attributes) {
        return attributes.map(function (attribute) {
            return getAttributeHtml(_character_id, attribute);
        }).join("");
    }
}

//TODO - adjust some references, like character.attributes, since Character is nested/referenced inside Attributes
//TODO - simplify into DRY code
//TODO - refactor into React?

function getCharacterHtml(character) {
    return `<hr>
            <p>
                <b class="character-name">${character.name}</b>
                <span class="edit-input" stye="display: none">
                    <input type="text" value="${character.name}" />
                    <button class="edit-character-submit-button" data-id="${character._id}">Save</button>
                </span>
                the ${(character.caste)} Caste
                <button class="edit-character-button">Edit</button>
                <br>
                <b>Attributes:</b>
                ${getAllAttributesHtml(character._id, character.attributes)}
                <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${character._id}>Delete</button>
                </p>
                <form class="form-inline" id="addAttributeForm" data-id=${character._id}>
                    <div class="form-group">
                        <input type="text" class="form-control" name="name" placeholder="Character attribute"
                    </div>
                    <button type="submit" class="btn btn-default">Add attribute</button>
                </form>
            `;
}

function getAllCharactersHtml(characters) {
    return characters.map(getCharacterHtml).join("");
}

function render() {
    $characterList.empty();

    let charactersHtml = getAllCharactersHtml(allCharacters);

    $characterList.append(charactersHtml);
}

function handleSuccess(json) {
    allCharacters = json;
    render();
}

function handleError(e) {
    console.log(`Error`);
    $(`#characterTarget`).text(`Failed to load characters; is server working?`);
}

function newCharacterSuccess(json) {
    $('#newCharacterForm input').val('');
    allCharacters.push(json);
    render();
}

function newCharacterError() {
    console.log(`New Character error`);
}

function deleteCharacterSuccess(json) {
    let character = json;
    console.log(json);
    let characterID = character._id;
    console.log(`Delete character`, characterID);

    for (i = 0; i < allCharacters.length; i++) {
        if (allCharacters[index]._id === characterID){
            allCharacters.splice(i, 1);
            break;
        }
    }
    render();
}

function deleteCharacterError() {
    console.log(`Delete character error`);
}

function newAttributeSuccess(json) {
    let character = json;
    let characterID = character._id;

    for (i = 0; i < allCharacters.length; i++) {
        if (allCharacters[index]._id === characterID) {
            allCharacters[index] = character;
            break;
        }
    }
    render();
}

function newAttributeError() {
    console.log(`Add new attribute error`);
}

function deleteAttributeSuccess(json) {
    let character = json;
    let characterID = character._id;

    for (i = 0; i < allCharacters.length; i++) {
        if(allCharacters[index]._id === characterID) {
            allCharacters[index] = character;
            break;
        }
    }
    render();
}

console.log(db.Character);
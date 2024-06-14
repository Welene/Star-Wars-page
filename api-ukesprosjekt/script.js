const apiUrl = 'https://swapi.dev/api/people/?search=';

const characterInput = document.getElementById('character-input');
const searchButton = document.getElementById('search-button');
const showObiButton = document.getElementById('show-obi');
const characterInfo = document.getElementById('character-info');
const headerBox = document.querySelector('.header-box');
const mainMenu = document.getElementById('main-menu');

searchButton.addEventListener('click', () => fetchData(characterInput.value.trim()));
showObiButton.addEventListener('click', () => fetchData('Obi-Wan Kenobi'));
headerBox.addEventListener('click', () => mainMenu.classList.toggle('show-menu'));

characterInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchData(characterInput.value.trim());
    }
});

function fetchData(characterName) {
    fetch(apiUrl + characterName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCharacterInfo(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayErrorMessage('Error fetching character information.');
        });
}

function displayCharacterInfo(characters) {
    characterInfo.innerHTML = '';

    if (characters.length === 0) {
        displayErrorMessage('Character not found.');
        return;
    }

    characters.forEach(character => {
        const { name, height, mass, hair_color, skin_color, eye_color } = character;
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');
        characterElement.innerHTML = `
            <h2>${name}</h2>
            <div class="character-details">
                <p>Height: ${height} cm</p>
                <p>Weight: ${mass} kg</p>
                <p>Hair Color: ${hair_color}</p>
                <p>Skin Color: ${skin_color}</p>
                <p>Eye Color: ${eye_color}</p>
            </div>`;
        characterInfo.appendChild(characterElement);
    });

    characterInfo.style.display = 'block';
}

function displayErrorMessage(message) {
    characterInfo.innerHTML = `<p>${message}</p>`;
    characterInfo.style.display = 'block';
}

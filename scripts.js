const apiUrl = 'https://rickandmortyapi.com/api/character';   //define la URL de la API para obtener datos de caracteres
const filterSelect = document.getElementById('filter');   //obtiene el elemento del menu desplegable con el ID "filter"
const cardsContainer = document.getElementById('cards-container');    //obtiene el elemento contenedor de tarjetas de caracteres con el ID "cards-container"

async function fetchData() {    //obtiene el elemento contenedor de tarjetas de caracteres con el ID "cards-container"
  try {
    const response = await fetch(apiUrl);   //obtiene los datos de la API y espera la respuesta
    const data = await response.json();   //convierte la respuesta a formato JSON
    return data.results;    //devuelve el array de datos de caracteres
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function loadData() {   //define una funcion asincrona para cargar datos de caracteres
  const characters = await fetchData(15);   //obtiene los datos de 15 caracteres
  filterSelect.innerHTML = '<option value="">All Characters</option>';    //restablece el menu desplegable para que muestre "Todos los caracteres" como opcion predeterminada
  characters.forEach(character => {   //recorre los datos de los caracteres
    const option = document.createElement('option');    //crea un nuevo elemento option
    option.value = character.name;    // establece el valor del elemento option al nombre del caracter
    option.textContent = character.name;    //establece el contenido de texto del elemento de opcion al nombre del carácter
    filterSelect.appendChild(option);   //añade el elemento option al menu desplegable
  });
  displayCards(characters);   //muestra las tarjetas de caracteres
}

function displayCards(characters) {   //define una funcion para mostrar las tarjetas de caracteres
  cardsContainer.innerHTML = '';    //reinicia el contenedor de tarjetas de caracteres
  const cardCount = Math.min(characters.length, 15);    //obtiene el numero mínimo de tarjetas de caracteres a mostrar
  //inicia un bucle for para mostrar las tarjetas de caracteres
  for (let i = 0; i < cardCount; i++) {
    const character = characters[i];    //obtiene los datos del carácter para la iteración actual
    if (character) {
      const card = document.createElement('div');   //crea un nuevo elemento div para la ficha del personaje
      card.classList.add('card', 'mb-4');   //añade las clases "card" y "mb-4" al elemento div
      //establece el HTML interno del elemento div
      card.innerHTML = `
        <div class="card-body">
          <img src="${character.image}" class="card-img-top" alt="${character.name}">
          <h5 class="card-title text-center">${character.name}</h5>
        </div>
      `;
      cardsContainer.appendChild(card);   //añade la carta de personaje al contenedor de cartas de personaje
    }
  }
}

function filterCharacters() {   //define una función para filtrar las tarjetas de caracteres basandose en la selección del menú desplegable
  const filterValue = filterSelect.value;   //obtiene el valor seleccionado del menu desplegable
  fetchData().then(characters => {    //obtiene todos los datos de caracteres y espera la respuesta
    if (filterValue) {
      const filteredCharacters = characters.filter(character => character.name === filterValue);    //filtra los datos de caracteres basándose en el valor de filtro seleccionado
      if (filteredCharacters.length > 0) {    //comprueba si algún caracter coincide con el valor del filtro
        displayCards(filteredCharacters);   //muestra las tarjetas de caracteres filtradas
        addSelectedClass(filteredCharacters[0]);    //añade la clase "seleccionada" a la primera tarjeta de caracteres filtrada
      } else {
        displayCards([]);   //muestra un contenedor de tarjetas de caracteres vacio.
        removeSelectedClass();    //elimina la clase "selected" de cualquier tarjeta de caracteres previamente seleccionada
      }
    } else {
      displayCards(characters);    //muestra todas las tarjetas de caracteres
      removeSelectedClass();    //elimina la clase "seleccionada" de cualquier tarjeta de personaje previamente seleccionada
    }
  });
}
function addSelectedClass(character) {    //define una función para añadir la clase "selected" a una tarjeta de personaje
  const selectedCard = document.querySelector('.card.selected');    //obtiene la tarjeta de personaje seleccionada actualmente
  if (selectedCard) {   //comprueba si una tarjeta de personaje ya está seleccionada
    selectedCard.classList.remove('selected');    //elimina la clase "selected" de la tarjeta de personaje previamente seleccionada
  }
  const card = document.querySelector(`.card[data-name="${character.name}"]`);    //obtiene el elemento tarjeta del personaje seleccionado
  if (card) {   //comprueba si el elemento tarjeta de personaje existe
    card.classList.add('selected');   //añade la clase "selected" al elemento tarjeta de personaje
    card.classList.add('selected-card');    //añade la clase "selected-card" al elemento tarjeta de personaje
  }
}

function removeSelectedClass() {    //define una funcion para eliminar la clase "selected" de cualquier tarjeta de personaje previamente seleccionada
  const selectedCard =document.querySelector('.card.selected');   //obtiene la tarjeta de personaje seleccionada actualmente
  if (selectedCard) {   //comprueba si una tarjeta de personaje está seleccionada
    selectedCard.classList.remove('selected', 'selected-card');   //elimina las clases "selected" y "selected-card" de la tarjeta de personaje
  }
}
filterSelect.addEventListener('change', filterCharacters);    //añade un escuchador de eventos al menu desplegable para activar la funcion filterCharacters cuando cambie el valor

loadData();   //llama a la función loadData para cargar los datos iniciales de los caracteres

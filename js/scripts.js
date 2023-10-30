// Header styling code
let mainTitle = document.querySelector('.myHeader');
mainTitle.innerText = 'List of Pokemon';
console.log(mainTitle.innerText);

// start of Pokemon Repository code
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  const searchBar = document.getElementById('search-bar');
  const suggestionsList = document.getElementById('suggestions');

  searchBar.addEventListener('input', function () {
    const searchText = searchBar.value.toLowerCase();
    const filteredPokemon = pokemonRepository.getAll().filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchText);
    });

    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    // Create and display new suggestions
    filteredPokemon.forEach((pokemon) => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = pokemon.name;
      suggestionItem.classList.add('suggestion-item');

      // Handle click on a suggestion
      suggestionItem.addEventListener('click', function () {
        searchBar.value = pokemon.name; // Fill the input with the selected suggestion
        suggestionsList.innerHTML = ''; // Clear suggestions
      });

      suggestionsList.appendChild(suggestionItem);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('failed to add pokemon');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    pokemonList.classList.add('list-group-item');

    let button = document.createElement('showModal');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    button.innerText = pokemon.name;
    button.classList.add('btn-primary', 'btn');

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', () => showDetails(pokemon));
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h2>' + pokemon.name + '</h2>');
    let imageElement = $('<img class="modal-img" />');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

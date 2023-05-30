// Header styling code
let mainTitle = document.querySelector("h1");
mainTitle.innerText = "List of Pokemon";
console.log(mainTitle.innerText);

// start of Pokemon Repository code
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
			hideModal();
		}
	});

	function add(pokemon) {
		if (typeof pokemon === "object" && "name" in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log("failed to add pokemon");
		}
	}

	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".pokemon-list");
		let listPokemon = document.createElement("li");
		pokemonList.classList.add("list-group-item");
		let button = document.createElement("showModal");

		button.innerText = pokemon.name;
		listPokemon.appendChild(pokemon);
		pokemonList.appendChild(listPokemon);
		button.addEventListener("click", () => showDetails(pokemon));
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
				pokemon.imageUrl = details.sprites.front_default;
				pokemon.height = details.height;
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
		let modalBody = $(".modal-body");
		let modalTitle = $(".modal-title");

		modalTitle.empty();
		modalBody.empty();

		let nameElement = $("<h2>" + pokemon.name + "</h2>");
		let imageElement = $('<img class="modal-img"');
		imageElement.attr("src", pokemon.imageUrl);
		let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");

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

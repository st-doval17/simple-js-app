// Header styling code
let mainTitle = document.querySelector("h1");
console.log(mainTitle.innerText);
mainTitle.innerText = "List of Pokemon";
console.log(mainTitle.innerText);

// start of Pokemon Repository code
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

	let modalContainer = document.querySelector("#modal-container");

	function showModal(title, text) {
		modalContainer.innerHTML = "";
		let modal = document.createElement("div");
		modal.classList.add("modal");

		let closeButtonElement = document.createElement("button");
		closeButtonElement.classList.add("modal-close");
		closeButtonElement.innerText = "Close";
		closeButtonElement.addEventListener("click", hideModal);

		let titleElement = document.createElement("h1");
		titleElement.innerText = title;

		let contentElement = document.createElement("p");
		contentElement.innerText = text;

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modalContainer.appendChild(modal);
		modalContainer.classList.add("is-visible");

		let pokemonImage = document.createElement("img");
		pokemonImage.src = pokemon.imageUrl;
		imageContainer.appendChild(pokemonImage);
	}

	function hideModal() {
		modalContainer.classList.remove("is-visible");
	}

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
			hideModal();
		}
	});

	modalContainer.addEventListener("click", (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	document.querySelector("#show-modal").addEventListener("click", () => {
		showModal(
			"Pokedex",
			"Click on a name to find out more about that Pokemon!"
		);
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
		let button = document.createElement("button");

		button.innerText = pokemon.name;
		button.classList.add("button-class");
		listPokemon.appendChild(button);
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
					console.log(pokemon);
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
			showModal(item.name, item.height, item.imageUrl);
		});
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

let pokemonRepository = (function () {
	let pokemonList = [
		{
			name: "Charmander",
			height: 0.6,
			types: ["monster", "dragon"],
		},
		{
			name: "Squirtle",
			height: 0.5,
			types: ["monster", "water1"],
		},
		{
			name: "Slowbro",
			height: 1.6,
			types: ["monster", "water1"],
		},
	];

	function getAll() {
		return pokemonList;
	}

	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon &&
			"height" in pokemon &&
			"types" in pokemon
		) {
			pokemonList.push(pokemon);
		} else {
			console.log("failed to add pokemon");
		}
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

	function showDetails(pokemon) {
		console.log(pokemon);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
	};
})();

pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);
});

let mainTitle = document.querySelector("h1");
console.log(mainTitle.innerText);
mainTitle.innerText = "List of Pokemon";
console.log(mainTitle.innerText);

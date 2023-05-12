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

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	return {
		add: add,
		getAll: getAll,
	};
})();

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

pokemonList.forEach(function (pokemon) {
	pokemonRepository.getAll(pokemon);
});

pokemonRepository.getAll().forEach(function (pokemon) {
	document.write("<p>Name: " + pokemon.name + "</p>");
	document.write("<p>Height: " + pokemon.height + "</p>");
	document.write("<p>Type: " + pokemon.types.join(", ") + "</p>");
});

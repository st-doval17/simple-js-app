// variable is called pokemonList and it has been given an array
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

for (let i = 0; i < pokemonList.length; i++) {
	// created a 'for' loop. initialization: let i = 0; condition: i<pokemonList.lenght; action: i++;
	if (pokemonList[i].height >= 1.0) {
		document.write(
			pokemonList[i].name +
				" (height: " +
				pokemonList[i].height +
				") - Wow, that's big! <br> "
		); // conditional set up so only one Pokémon has the label “Wow, that’s big!”
	} else {
		document.write(
			pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br> "
		);
	}
}
// 'else' clause is added to make additional statement
// pokemon's height is written next to it's name by use of a 'string'
// adding the <br> HTML element to display the text below/new line

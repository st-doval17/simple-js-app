let mainTitle = document.querySelector(".myHeader");
(mainTitle.innerText = "List of Pokemon"), console.log(mainTitle.innerText);
let pokemonRepository = (function () {
	let t = [];
	function e(e) {
		"object" == typeof e && "name" in e
			? t.push(e)
			: console.log("failed to add pokemon");
	}
	function n() {
		return t;
	}
	function o(t) {
		return fetch(t.detailsUrl)
			.then(function (t) {
				return t.json();
			})
			.then(function (e) {
				(t.imageUrl = e.sprites.front_default), (t.height = e.height);
			})
			.catch(function (t) {
				console.error(t);
			});
	}
	function i(t) {
		o(t).then(function () {
			a(t);
		});
	}
	function a(t) {
		let e = $(".modal-body"),
			n = $(".modal-title");
		n.empty(), e.empty();
		let o = $("<h2>" + t.name + "</h2>"),
			i = $('<img class="modal-img" />');
		i.attr("src", t.imageUrl);
		let a = $("<p>Height : " + t.height + "</p>");
		n.append(o), e.append(i), e.append(a);
	}
	return (
		window.addEventListener("keydown", (t) => {
			"Escape" === t.key &&
				modalContainer.classList.contains("is-visible") &&
				hideModal();
		}),
		{
			add: e,
			getAll: n,
			addListItem: function t(e) {
				let n = document.querySelector(".pokemon-list"),
					o = document.createElement("li");
				n.classList.add("list-group-item");
				let a = document.createElement("showModal");
				a.setAttribute("data-target", "#pokemonModal"),
					a.setAttribute("data-toggle", "modal"),
					(a.innerText = e.name),
					a.classList.add("btn-primary", "btn"),
					o.appendChild(a),
					n.appendChild(o),
					a.addEventListener("click", () => i(e));
			},
			loadList: function t() {
				return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
					.then(function (t) {
						return t.json();
					})
					.then(function (t) {
						t.results.forEach(function (t) {
							e({ name: t.name, detailsUrl: t.url });
						});
					})
					.catch(function (t) {
						console.error(t);
					});
			},
			loadDetails: o,
			showDetails: i,
			showModal: a,
		}
	);
})();
pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (t) {
		pokemonRepository.addListItem(t);
	});
});

const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input_search");
const btnPrev = document.querySelector(".btn_prev");
const btnNext = document.querySelector(".btn_next");
const pokemonType = document.querySelector(".type");
const pokemonHeight = document.querySelector(".height");

let searchPokemon = 0;
if (searchPokemon === 0) {
  pokemonName.innerHTML = "pokeball";
  pokemonNumber.innerHTML = "#0";
  pokemonImage.src = "./favicons/pokeball-icon.gif";
}

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "#0";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = "#" + data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    //pokemon type & height
    pokemonType.innerHTML = "type: " + data.types[0].type.name;
    pokemonHeight.innerHTML = "height: " + data.height / 10 + "m";
    searchPokemon = data.id;
    inputSearch.value = "";
  } else {
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = "#0";
    pokemonImage.src = "./img/open-pokeball.gif";
    inputSearch.value = "";
    searchPokemon = 0;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 0) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  } else if (searchPokemon <= 0) {
    pokemonName.innerHTML = "pokeball";
    pokemonNumber.innerHTML = "#0";
    pokemonImage.src = "./favicons/pokeball-icon.gif";
  }
});
btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon());

// https://pokeapi.co/api/v2/pokemon/1/ -> sprites -> (que elija la imagen que quiera)
// front_default, front_shiny

// o entrar a other y elegir
//  dream_world -> front_default o home -> front_default o official-artwork -> front_default

//dirección para obtener el listado en formato json:
const pokeapi_URL = "https://pokeapi.co/api/v2/";

//acá esta la url para tener la sección de ability
const ability_URL = "https://pokeapi.co/api/v2/ability/";

//acá esta la url para tener la sección de pokemon
const pokemon_URL = "https://pokeapi.co/api/v2/pokemon/";

//acá esta la url para tener la sección de region
const region_URL = "https://pokeapi.co/api/v2/region/";


//función para mostrar el spinner de carga:
function showSpinner(){
  document.getElementById("spinner-wrapper").style.display = "block"; 
}

//función para ocultar el spinner de carga:
function hideSpinner(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

async function getData(url) {
  try {
    const response = await fetch(url);

    return response.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function mostrarPokemon() {
  try {
    const pokeData = await getData(pokemon_URL);
    const pokemonContainer = document.getElementById("pokemonContainer");

    pokemonContainer.innerHTML = '';

    for (let pokemon of pokeData.results) {
      const pokeInfo = await getData(pokemon.url);

      pokemonContainer.innerHTML +=
        `
      <div class="row gap-5">
        <div class="card col">
          <img src="${pokeInfo.sprites.front_default}" alt="${pokemon.name}"/>
          <hr />
          <div class="card-body">
            <h3 class="text-center">${pokemon.name}</h3>
          </div>
        </div>  
      </div>
      `;
    }
    pokemonContainer.style.cssText = "display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; "
  } catch (error) {
    console.error(error);
  }
}

async function mostrarHabilidades() {
  try {
    const abilityData = await getData(ability_URL);

    const abilityContainer = document.getElementById("pokemonContainer");
    abilityContainer.innerHTML = "";

    for (let ability of abilityData.results) {
      abilityContainer.innerHTML += `<p>${ability.name}</p>`;
    }
  } catch (error) {
    console.error(error);
  }
}

async function mostrarRegiones() {
  try {
    const regionData = await getData(region_URL);

    const regionContainer = document.getElementById("pokemonContainer");
    regionContainer.innerHTML = '';

    for (let region of regionData.results) {
      regionContainer.innerHTML += `<p>${region.name}</p>`
    }
    pokemonContainer.style.cssText = "display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;"
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('busqueda').addEventListener("click", function() {
  let valor = document.getElementsByClassName('form-select')[0].value;

  switch(valor) {
    case '1':
      mostrarPokemon();
      break;
    case '2':
      mostrarHabilidades();
      break;
    case '3':
      mostrarRegiones();
      break;
  }
});


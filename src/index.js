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

//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos y el estado de la respuesta:
function getJSONData(url){
    let result = {};
    showSpinner(); 
    return fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner(); 
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner(); 
        return result;
    });
}

const habilidad = getJSONData(ability_URL);
const region = getJSONData(region_URL);

document.getElementById('busqueda').addEventListener("click", function(){

  let valor = document.getElementsByClassName('form-select')[0].value
 
    switch(valor){

      case '1':
        break
    
      case '2':
  
        for (let i of habilidad.results){ 
        document.getElementById('divability').innerhtml +=

        ` <p>${i.name} </p>`

        } 
    
        break
      case '3':
        for (let i of region.results){ 
          document.getElementsByClassName("container-xl").innerhtml +=
  
          ` <p>${i.name} </p>`
      }

        break
  
    
    }

})





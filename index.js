const apiData = {
    url : "https://pokeapi.co/api/v2/",
    type : "pokemon",
}
const submit = document.querySelector(".search-button")
const map = new Map();
const error_message = (message) => {
    error =  `<div class = "error"> 
    ${message} 
    
    </div>`
     
     const div = document.querySelector(".error-message")
     div.innerHTML = error
     div.classList.add("active")
 }
submit.addEventListener("click", () => {
    let pokeName = document.querySelector(".search-input").value.toLowerCase()
    const {url, type} = apiData;
    const apiUrl = `${url}${type}/${pokeName}`;
    error_message("Fetching data...")


fetch(apiUrl)
    .then((data) => {
        if (data.ok){
            const div = document.querySelector(".error-message")
            div.classList.remove("active")
            if(!map.has(pokeName)){
                data.json().then((pokemon) => {toHTML(pokemon)})
                map.set(pokeName, `{pokeName}`);
            }
            else{
                error_message("This Pokemon is already displaying!")
                return
            }
        }
        else{
            error_message("Please enter a valid Pokemon name!")
        }
    })
    


const toHTML = (data) => {
 
    html = `
    <div class="pokemon-container">
        <h2>${data.species.name}</h2>
        <div class = pokemon-stats>
            <img src="${data.sprites.other["official-artwork"].front_default}">
            <div class = "pokemon-info">
            <h2 class ="abi">Abilities:</h2>
                <div class = "pokemon-ability">
                    
                    <div class = "abilities ${data.species.name}">
                    
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>`
    const div = document.querySelector(".main-container")
    div.innerHTML += html
    const pokemon_abilities = document.querySelector(`.${data.species.name}`)
    data.abilities.forEach(element => {
        pokemon_abilities.innerHTML += `<h2>${element.ability.name}</h2>`
    })
}

})


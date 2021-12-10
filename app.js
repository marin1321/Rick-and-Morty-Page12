const contain_card = document.getElementById('contain_card')
const template = document.getElementById('template').content
const character = document.getElementById('character')
const fragment = document.createDocumentFragment()


function selector(rick) {
    rick.forEach(morty => {
        const option = document.createElement('option')
        option.setAttribute('id', 'full')
        option.setAttribute('value', morty.name)
        option.textContent = morty.name
        fragment.appendChild(option)
    })
    character.appendChild(fragment)
    rendercard(rick)
    character.addEventListener('change', function () {
        rendercard(rick)
    })

}

function rendercard(rick) {
    if (character.value === 'Todos') {
        contain_card.innerHTML = ''
        rick.forEach(morty => {
            let clone = document.importNode(template, true)
            clone.querySelector('#img_character').src = morty.image
            clone.querySelector('#name_character').textContent = morty.name
            clone.querySelector('#gender_character').textContent = morty.gender
            fragment.appendChild(clone)
        })

        contain_card.appendChild(fragment)
    } else {
        contain_card.innerHTML = ''
        const result = rick.filter(morty => morty.name === character.value)
        let clone = document.importNode(template, true)
        clone.querySelector('#img_character').src = result[0].image
        clone.querySelector('#name_character').textContent = result[0].name
        clone.querySelector('#gender_character').textContent = result[0].gender
        fragment.appendChild(clone)
        contain_card.appendChild(fragment)
    }
}


function conection() {
    fetch("https://rickandmortyapi.com/api/character/?page=12")
        .then(response => response.json())
        .then(data => selector(data.results));

}

conection()


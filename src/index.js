document.addEventListener('DOMContentLoaded', () => {

    fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(renderDog))
})

const renderDog = (dog) => {
    const row = document.createElement('tr')

    const name = document.createElement('td')
    name.innerText = dog.name
    
    const breed = document.createElement('td')
    breed.innerText = dog.breed

    const sex = document.createElement('td')
    sex.innerText = dog.sex

    editButton = document.createElement('button')
    editButton.innerText = "Edit"

    editButton.addEventListener('click', () => {editDog(dog)})

    const tableBody = document.getElementById("table-body")

    row.append(name, breed, sex, editButton)

    tableBody.append(row)
}

const editDog = (dog) => {
    console.log(dog)

    const dogForm = document.getElementById('dog-form')
    
    const inputs = dogForm.querySelectorAll('input')

    const nameInput = inputs[0]
    nameInput.value = dog.name

    const breedInput = inputs[1]
    breedInput.value = dog.breed

    const sexInput = inputs[2]
    sexInput.value = dog.sex

    const newDog = {id: dog.id, name: nameInput.value, breed: breedInput.value, sex: sexInput.value}
    console.log(newDog)

    const changeDog = inputs[3]
    console.log(changeDog)
    changeDog.onsubmit = function(e) {makeChange(e, newDog)} 
}

const makeChange = (e, dog) => {
    console.log(dog)
    e.preventDefault()
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ dog })
    })
    .then(res => console.log(res))
    
    // .then(newDog => {renderDog(newDog)
    // })
    // .catch(err => console.log({failure: err}))

}
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

    // const newDog = {id: dog.id, name: nameInput.value, breed: breedInput.value, sex: sexInput.value}

    const changeDog = inputs[3]
    changeDog.addEventListener("submit", function(e){
        e.preventDefault();
        // const newName = e.target.nameInput.value
        // const newBreed = e.target.breedInput.value
        // const newSex = e.target.sexInput.value

        fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ 
            id: dog.id,
            name: nameInput.value,
            breed: breedInput.value,
            sex: sexInput.value
        })
    })
    .then(res => console.log(res))
    .then(newDog => renderDog(newDog))

    })
}
}

// const makeChange = (event, newDog) => {
//     event.preventDefault()
//     fetch(`http://localhost:3000/dogs/${dog.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({ dog })
//     })
//     .then(res => console.log(res))
//     .then(newDog => renderDog(newDog))
// }

const foodList = document.querySelector('.foodList')
var trash = document.getElementsByClassName("fa-trash");

foodList.addEventListener('click', enableEdit)
foodList.addEventListener('click', editFood)
foodList.addEventListener('click', deleteItem)

// enable vote
function enableEdit(e){
  if(e.target.className === 'edit'){
    const listItem = e.target.closest('.food')
    const editForm = listItem.querySelector('form')
    editForm.classList.remove('hidden')
  }
}

function editFood(e) {
  if(e.target.className === 'submitEdit') {
    e.preventDefault()
    const listItem = e.target.closest('.food')
    const editForm = listItem.querySelector('form')
    const name = listItem.querySelector('.food > .name').innerText
    const calories = listItem.querySelector('.food > .calories').innerText
    const servings = listItem.querySelector('.food > .servings').innerText
    console.log(editForm)
    const newName = editForm.querySelector('.name').value
    const newCalories = editForm.querySelector('.calories').value
    const newServings = editForm.querySelector('.servings').value
    fetch('edit', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'calories': calories,
          'servings': servings,
          'newName': newName,
          'newCalories': newCalories,
          'newServings': newServings,
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  }
}

function deleteItem(e) {
  if(e.target.className === 'fa fa-trash') {
    const listItem = e.target.closest('.food')
    const name = listItem.querySelector('.name').innerText
    const calories = listItem.querySelector('.calories').innerText
    const servings = listItem.querySelector('.servings').innerText
    fetch('remove', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'calories': calories,
        'servings': servings,
      })
    }).then(function (response) {
      window.location.reload()
    })
  }
}
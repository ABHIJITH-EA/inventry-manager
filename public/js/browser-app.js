const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputIdDOM = document.querySelector('.pid')
const taskInputNameDOM = document.querySelector('.pname')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { products },
    } = await axios.get('/api/v1/tasks')
    console.log(products)
    if (products.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No Products in list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = products
      .map((task) => {
        const {_id: taskID, name, id } = task
        return `<div class="single-task">
        <div class="align">
          <span>${id}</span>
          <span>${name}</span>
        </div>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}
{/* <h5><span><i class="far fa-check-circle"></i></span>${name}</h5> */}
showTasks()


formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputNameDOM.value
  const id = taskInputIdDOM.value

  try {
    await axios.post('/api/v1/tasks', { name, id })
    showTasks()
    taskInputNameDOM.value = ''
    taskInputIdDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, product added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

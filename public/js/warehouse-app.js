const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputNameDOM = document.querySelector('.wname')
const taskInputLimitDOM = document.querySelector('.limit')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: {warehouse},
    } = await axios.get('/api/v1/warehouse')
    if (warehouse.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">Nothing to list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = warehouse
      .map((task) => {
        const {_id: taskID, number , limit} = task
        return `<div class="single-task">
        <div class="align">
          <span>${number}</span>
          <span>${limit}</span>
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

showTasks()

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const wareHouseNumber = parseInt(taskInputNameDOM.value)
  const limit = parseInt(taskInputLimitDOM.value)
  console.log(wareHouseNumber)
  try {
    await axios.post('/api/v1/warehouse', { wareHouseNumber, limit })
    showTasks()
    taskInputNameDOM.value = ''
    taskInputLimitDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, warehouse added`
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

const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputPidDOM = document.querySelector('.pid')
const taskInputNameDOM = document.querySelector('.wname')
const taskInputQtyDOM = document.querySelector('.qty')
const formAlertDOM = document.querySelector('.form-alert')

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { stock },
    } = await axios.get('/api/v1/stock')
    if (stock.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No Stocks added</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = stock
      .map((task) => {
        const {_id: taskID, number, pid, qty } = task
        return `<div class="single-task">
        <div class="align">
        <span>${pid}</span>
        <span>${number}</span>
        <span>${qty}</span> 
        <a href="unstock.html?id=${pid}&number=${number}"  class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        </div>
<div class="task-links">



<!-- edit link -->

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
// /* <span>${pid}</span> <span>${name}</span> <span>${qty}s</span>  */
{/* <h5><span><i class="far fa-check-circle"></i></span>${pid} ${name} ${qty}</h5> */}
showTasks()

// delete task /api/tasks/:id

// tasksDOM.addEventListener('click', async (e) => {
//   const el = e.target
//   if (el.parentElement.classList.contains('delete-btn')) {
//     loadingDOM.style.visibility = 'visible'
//     const id = el.parentElement.dataset.id
//     try {
//       await axios.delete(`/api/v1/stock/${id}`)
//       showTasks()
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   loadingDOM.style.visibility = 'hidden'
// })

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const pid = parseInt(taskInputPidDOM.value)
  const number = parseInt(taskInputNameDOM.value)
  const qty = parseInt(taskInputQtyDOM.value)
  try {
    await axios.post('/api/v1/stock', { pid, number , qty})
    showTasks()
    taskInputPidDOM.value = ''
    taskInputNameDOM.value = ''
    taskInputQtyDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, STock added`
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

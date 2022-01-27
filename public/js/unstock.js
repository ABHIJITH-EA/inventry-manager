const taskInputPidDOM = document.querySelector('.pid')
const taskInputNameDOM = document.querySelector('.wname')
const taskInputQtyDOM = document.querySelector('.qty')
const editFormDOM = document.querySelector('.task-form')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const param = new URLSearchParams(params)
let tempName

taskInputPidDOM.value = param.get('id')
taskInputNameDOM.value = param.get('number')

editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const warehouseName = parseInt(taskInputNameDOM.value)
    const pid = parseInt(taskInputPidDOM.value)
    const qty = parseInt(taskInputQtyDOM.value)

    const {
      data: { task },
    } = await axios.patch(`/api/v1/stock/${param.get('id')}/${param.get('number')}`, {
      name: warehouseName,
      id: pid,
      qty: qty
    })
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, Product unstocked`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    if (error.response.status == 500) {
      formAlertDOM.innerHTML =  error.response.data['message']
    } else {
      formAlertDOM.innerHTML = `error, please try again`
    }
    
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

export default function () {
  let notify = JSON.parse(localStorage.getItem('notify'))
  return {
    notifications: notify ? notify : []
  }
}

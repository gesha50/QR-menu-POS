export default function () {
  let notify = JSON.parse(localStorage.getItem('notify'))
  return {
    notifications: notify ? notify : [{icon: 'notifications_active',label: 'Inbox',description: 'fgecdhn vfecubhnkjefc vfe',isReading: false,}] 
  }
}

export function getOrders (state, data) {
  state.rows = []
  data.data.forEach(order=>{
    let rowObj = {}
    let optionsDate = {
      day: 'numeric',
      month:'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    }
    rowObj.ID = order.id
    rowObj.created_at = new Intl.DateTimeFormat('ru-RU', optionsDate).format(new Date(Date.parse(order.created_at)))
    rowObj.table = order.table_id ? order.table_id : (order.delivery_method === 1 ? 'delivery' : 'take-away' )
    rowObj.items = order.items.length
    rowObj.price = order.order_price
    rowObj.status = order.last_status.length ? order.last_status[0].alias : 'waiting'
    rowObj.actions = order.actions.buttons.length ? order.actions.buttons : ['действий не требуется']
    state.rows.push(rowObj)
  })
}


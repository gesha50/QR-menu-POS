export function getOrders (state, data) {
  state.rows = []
  data.data.forEach(order=>{
    let rowObj = {}
    rowObj.ID = order.id
    rowObj.created_at = order.time_created
    rowObj.table = order.table_id ? order.table_id : (order.delivery_method === 1 ? 'delivery' : 'take-away' )
    rowObj.items = order.items.length
    rowObj.price = order.order_price
    rowObj.status = order.last_status.length ? order.last_status[0].alias : 'waiting'
    rowObj.actions = order.actions.buttons.length ? order.actions.buttons : ['действий не требуется']
    state.rows.push(rowObj)
  })
}


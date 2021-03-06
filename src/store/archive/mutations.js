export function getOrders (state, data) {
  state.rows = []
  data.data.forEach(order=>{
    let rowObj = {}
    console.log(order)
    rowObj.ID = order.id
    rowObj.created_at = order.time_created
    rowObj.table = order.table_id
    rowObj.items = order.items
    rowObj.price = order.order_price
    rowObj.status = order.last_status.length ? order.last_status[0].name : 'waiting'
    rowObj.actions = order.actions.buttons.length ? order.actions.buttons : ['действий не требуется']
    state.rows.push(rowObj)
  })
}

export function getArchive(state, data) {
  state.rows.bind(state, data)
}
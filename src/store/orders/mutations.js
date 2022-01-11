export function getOrders (state, data) {
  state.rows = []
  data.data.forEach(order=>{
    let rowObj = {}
    console.log(order)
    rowObj.ID = order.id
    rowObj.created_at = order.time_created
    rowObj.table = order.table_id
    rowObj.items = order.items.length
    rowObj.price = order.order_price
    rowObj.status = order.last_status.length ? order.last_status[0].name : 'waiting'
    state.rows.push(rowObj)
  })
}


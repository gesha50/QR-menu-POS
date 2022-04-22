export default function () {
  return {
    columns: [
      {
        name: 'ID',
        required: true,
        label: 'orders.ID',
        align: 'left',
        field: row => row.ID,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'created_at', align: 'center', label: 'orders.created_at', field: 'created_at'},
      { name: 'table', label: 'orders.tableOrMethod', field: 'table', align: 'center'},
      { name: 'items', label: 'orders.items', field: 'items', align: 'center' },
      { name: 'price', label: 'orders.price', field: 'price', align: 'center' },
      { name: 'status', label: 'orders.statuses', field: 'status', sortable: true, align: 'center' },
      { name: 'actions', label: 'orders.actions', field: 'actions', align: 'center' },
    ],
    rows: [],
  }
}

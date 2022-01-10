export default function () {
  return {
    columns: [
      {
        name: 'ID',
        required: true,
        label: 'ID',
        align: 'left',
        field: row => row.ID,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'created_at', align: 'center', label: 'created_at', field: 'created_at'},
      { name: 'table', label: 'table / method', field: 'table', align: 'center'},
      { name: 'items', label: 'items', field: 'items', align: 'center' },
      { name: 'price', label: 'price', field: 'price', align: 'center' },
      { name: 'status', label: 'status', field: 'status', sortable: true, align: 'center' },
      { name: 'actions', label: 'actions', field: 'actions', align: 'center' },
    ],
    rows: [],
  }
}

export default function () {
  return {
    activeCategoryID: 0,
    areasTablesObj: [],
    otherTables: null,
    firstScreenTables: '',
    categories: [],
    items: [],
    carts: JSON.parse(localStorage.getItem("itemInCart")) ? JSON.parse(localStorage.getItem("itemInCart")) : {},
    ItemsInCart: [],
    searchItemInMenu: '',
    comments: JSON.parse(localStorage.getItem("comments")) ? JSON.parse(localStorage.getItem("comments")) : {},

  }
}

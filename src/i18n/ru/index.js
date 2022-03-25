import error404 from "src/i18n/ru/error404";
import login from "src/i18n/ru/login"
import btn from "src/i18n/ru/buttons"
import restaurantSettings from "src/i18n/ru/restaurantSettings";
import loginWaiter from "src/i18n/ru/loginWaiter";
import waiters from "src/i18n/ru/waiters";
import tables from "src/i18n/ru/tables";
import archive from "src/i18n/ru/archive";

export default {
  btn,
  login,
  waiters,
  restaurantSettings,
  loginWaiter,
  tables,
  archive,
  error404,
  valuta: '₽',
  search: 'Поиск...',
  failed: 'Действие не выполнено',
  success: 'Успешно',
  noConnection: 'Нет подключения к интернету',
  status: {
    just_created: 'только что',
    accepted_by_admin: 'принято админом',
    accepted_by_restaurant: 'принято рестораном',
    assigned_to_driver: 'передано курьеру',
    prepared: 'готово',
    picked_up: 'взято',
    delivered: 'доставлено',
    rejected_by_admin: 'отклонено админом',
    rejected_by_restaurant: 'отклонено рестораном',
    updated: 'обновлено',
    closed: 'закрыто',
    rejected_by_driver: 'отклонено водителем',
    accepted_by_driver: 'принято водителем'
  },
}

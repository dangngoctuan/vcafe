export function SET_TABLES (state, { coffeeTables }) {
  state.loadingTables = false;
  state.coffeeTables = coffeeTables;
}

export function SET_MENUS (state, { menus }) {
  state.loadingMenus = false;
  state.menus = menus
}

export function FETCHING_LIST_TABLE (state) {
  state.loadingTables = true;
}

export function FETCHING_LIST_MENU (state) {
  state.loadingMenus = true;
}

export function LOGGING_IN (state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL (state, { userObj }) {
  state.userObj = userObj;
  state.logging_in = false;
}

export function ADD_ORDER_FOR_LIST_TABLE (state, { listTableOrder }) {
  state.list_table_order.push(listTableOrder)
}

export function REMOVE_ORDER_OF_LIST_TABLE (state, { listTableOrder }) {
  state.list_table_order.splice(state.list_table_order.indexOf(listTableOrder), 1)
}

export function ADD_CURRENT_TABLE_ORDER (state, { listTableOrder }) {
  state.table_current_order = listTableOrder
}

export function REMOVE_CURRENT_TABLE_ORDER (state, { listTableOrder }) {
  listTableOrder = {}
  state.table_current_order = listTableOrder
}

export function HANDLE_CHECKOUT_TABLE (state, { tableOrder }) {
  state.table_total_bill = tableOrder
}

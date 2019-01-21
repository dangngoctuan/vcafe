export function SET_TABLES (state, { coffee_tables }) {
  state.loadingTables = false;
  state.coffee_tables = coffee_tables;
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

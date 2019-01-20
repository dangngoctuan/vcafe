export function SET_TABLES (state, { coffee_tables}) {
  state.loadingTables = false;
  state.coffee_tables = coffee_tables;
}

export function FETCHING_LISTS (state) {
  state.loadingTables = true;
}

export function LOGGING_IN (state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL (state, {userObj}) {
  state.userObj = userObj;
  state.logging_in = false;
}

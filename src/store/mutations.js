export function SET_POSTS (state, { posts}) {
  state.loadingPosts = false;
  state.posts = posts;
}

export function FETCHING_LISTS (state) {
  state.loadingPosts = true;
}

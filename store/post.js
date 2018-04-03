import postApi from "~/api/post";

export const state = () => ({
  posts: {},
  latest: [],
});

export const mutations = {
  cache(state, posts) {
    posts.forEach((post) => {
      state[post.id] = post;
    }, state.posts)
  },
  appendLatest(state, posts) {    
    state.latest.push(...posts);
  }
};

export const actions = {
  async fetchLatest({ commit, state }) {
    if(state.latest.length != 0) return;
    const latestPosts = await postApi.index();
    commit('appendLatest', latestPosts);
    commit('cache', latestPosts);
  }
};

export const state = () => ({
  content: null,
  color: "green",
  visible: false,
});

export const mutations = {
  info(state, content) {
    state.content = content;
    state.color = "green";
    state.visible = true;
  },
  alert(state, content) {
    state.content = content;
    state.color = "yellow";
    state.visible = true;
  },
  dismiss(state) {
    state.visible = false;
  }
}

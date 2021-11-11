export default {
  namespaced: true,
  state() {
    return {
      menu: [],
      menu_is_visible: false,
    };
  },
  mutations: {
    SET_MENU_IS_VISIBLE(state, value) {
      state.menu_is_visible = value;
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
  },
};

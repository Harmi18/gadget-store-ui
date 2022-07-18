import state from "./moduleCartState";
import mutations from "./moduleCartMutations";
import actions from "./moduleCartActions";
import getters from "./moduleCartGetter";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

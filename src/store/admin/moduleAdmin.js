import state from "./moduleAdminState";
import mutations from "./moduleAdminMutations";
import actions from "./moduleAdminActions";
import getters from "./moduleAdminGetter";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

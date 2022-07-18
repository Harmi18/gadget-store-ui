import moduleProduct from "./product/moduleProduct";
import moduleCart from "./cart/moduleCart";
import moduleAdmin from "./admin/moduleAdmin";

import { createStore } from "vuex";

export const store = createStore({
  modules: {
    product: moduleProduct,
    cart: moduleCart,
    admin: moduleAdmin,
  },
});

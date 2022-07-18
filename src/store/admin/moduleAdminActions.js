import axios from "axios";
export default {
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://fakestoreapi.com/users")
        .then((response) => {
          commit("GET_USERS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

<template>
  <div class="back">
    <div class="div-center">
      <div class="content">
        <h3>Login</h3>
        <hr />
        <span><label>Username</label></span>
        <input
          class="form-control"
          v-model="username"
          type="text"
          placeholder="Username"
        />
        <hr />
        <span><label>Password</label></span>
        <input
          class="form-control"
          v-model="password"
          type="password"
          placeholder="password"
        />
        <hr />
        <button type="button" class="btn btn-dark login" @click="loginUser">
          Login
        </button>
      </div>
    </div>
    <div v-show="showAlert">
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="bi bi-info-circle" style="margin: 10px"></i>
        <div>Invalid Username and Password</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      showAlert: false,
    };
  },

  methods: {
    async loginUser() {
      if (
        this.$route.path === "/admin/login" &&
        this.username !== "johnd" &&
        this.password !== "m38rmF$"
      ) {
        this.showAlert = true;
        return;
      }
      if (
        this.$route.path === "/loginUser" &&
        this.username !== "johnd" &&
        this.password !== "m38rmF$" &&
        this.username !== "mor_2314" &&
        this.password !== "83r5^_"
      ) {
        this.showAlert = true;
        return;
      }
      await axios
        .post("https://fakestoreapi.com/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (
            this.$route.path === "/admin/login" &&
            this.username === "johnd" &&
            this.password === "m38rmF$"
          ) {
            localStorage.setItem("token", response.data.token);
            this.$router.push({ path: "/admin" });
          } else {
            localStorage.setItem("token", response.data.token);
            this.$router.push({ path: "/product" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  background: #e2e2e2;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.login {
  width: 150px !important;
}

.div-center {
  width: 400px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 1em 2em;
  border-bottom: 2px solid #ccc;
  display: table;
}

div.content {
  display: table-cell;
  vertical-align: middle;
}
</style>
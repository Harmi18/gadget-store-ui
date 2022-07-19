<script>
import "bootstrap-icons/font/bootstrap-icons.css";
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>

<template>
  <div>
    <!-- <router-view class="router-view" /> -->
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-view {
  position: relative;
  padding: 90px 0px;
}
@media screen and (max-width: 768px) {
  .card {
    height: 392px !important;
    width: 343px !important;
  }
  .justify-content-end.d-flex {
    margin-top: 50px;
  }
}
</style>

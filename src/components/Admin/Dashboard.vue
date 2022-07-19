<template>
  <div class="wrapper">
    <!-- Sidebar  -->
    <nav
      id="sidebar"
      style="
        position: fixed;
        width: 200px;
        height: -webkit-fill-available;
        z-index: 1;
      "
    >
      <div class="sidebar-header">
        <h3>Admin</h3>
      </div>

      <ul class="list-unstyled components">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/user">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/product"
            >Product</router-link
          >
        </li>
      </ul>
    </nav>
    <div id="content" style="padding: 6px 8px 6px 16px">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light"
        style="position: fixed; width: calc(100% - 290px); margin-left: 245px"
      >
        <div class="container-fluid dashboard-title">
          <h6>Dashboard</h6>
          &nbsp;
          <button type="button" class="btn btn-secondary" @click="logoutAdmin">
            Logout
          </button>
        </div>
      </nav>

      <div class="line"></div>
      <div v-if="this.$route.path === '/admin'">
        <h5>Welcome To Admin Panel</h5>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logoutAdmin() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/admin/login" });
    },
  },
};
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
body {
  font-family: "Poppins", sans-serif;
  background: #fafafa;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #0d0d0e;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: rgb(71 116 139);
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid rgb(71 116 139);
}

#sidebar ul p {
  color: rgb(170, 167, 167);
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #252525;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #0d0d0e;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #0d0d0e;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #0d0d0e;
}

a.article,
a.article:hover {
  background: #0d0d0e !important;
  color: #fff !important;
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}
</style>
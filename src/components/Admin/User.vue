<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <br />
          <button
            class="btn btn-default pull-right"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="togglebutton = 'Add'"
          >
            <i class="fa fa-plus"></i>&nbsp;&nbsp; Add Row
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-bordered" id="editableTable">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Street</th>
                <th>ZipCode</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Email</th>
                <th>UserName</th>
                <th>Password</th>
                <th>Phone No</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              <tr data-id="1" v-for="user in showUserList" :key="user">
                <td data-field="name">
                  {{ user.name.firstname }}
                </td>
                <td data-field="birthday">
                  {{ user.name.lastname }}
                </td>
                <td data-field="birthday">
                  {{ user.address.city }}
                </td>
                <td data-field="birthday">
                  {{ user.address.street }}
                </td>
                <td data-field="birthday">
                  {{ user.address.zipcode }}
                </td>
                <td data-field="sex">
                  {{ user.address.geolocation.long }}
                </td>
                <td data-field="sex">
                  {{ user.address.geolocation.lat }}
                </td>
                <td data-field="age">{{ user.email }}</td>
                <td data-field="sex">{{ user.username }}</td>
                <td data-field="sex">{{ user.password }}</td>
                <td data-field="sex">{{ user.phone }}</td>

                <td>
                  <div style="display: inline-flex">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="editUser(user)"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteUser"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
                <div class="modal" tabindex="-1" role="dialog" id="deleteUser">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Delete</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>Do you want to delete User ?</p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          @click="removeUser(user)"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Previous"
                      @click="currentCount -= 1"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>

                  <li class="page-item" v-for="count in pageCount" :key="count">
                    <a class="page-link" href="#" @click="currentCount = count">
                      {{ count }}</a
                    >
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Next"
                      @click="currentCount += 1"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <UserModal
      :mode="togglebutton"
      :fields="userFields"
      @add="addUsers"
      @updateUser="updateUsers"
    />
  </div>
</template>

<script>
import axios from "axios";
import UserModal from "./UserModal.vue";
export default {
  components: {
    UserModal,
  },
  data() {
    return {
      users: [],
      togglebutton: "",
      userFields: {
        email: "",
        username: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
        address: {
          city: "",
          street: "",
          number: "",
          zipcode: "",
          geolocation: {
            latitude: "",
            longitude: "",
          },
        },
        phone: "",
      },
      productListCount: 5,
      pageCount: 0,
      currentCount: 1,
    };
  },
  async mounted() {
    let res = await this.$store.dispatch("admin/getUsers");
    this.users = res.data;
    this.pageCount = Math.ceil(this.users.length / this.productListCount);
  },
  computed: {
    showUserList() {
      let data = this.users.slice(
        this.productListCount * (this.currentCount - 1),
        this.productListCount * this.currentCount
      );
      return data;
    },
  },
  methods: {
    async editUser(user) {
      this.togglebutton = "Update";
      this.userFields = {
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        firstname: user.name.firstname,
        lastname: user.name.lastname,
        city: user.address.city,
        street: user.address.street,
        number: user.address.number,
        zipcode: user.address.zipcode,
        latitude: user.address.geolocation.lat,
        longitude: user.address.geolocation.long,
        phone: user.phone,
      };
    },

    async addUsers(res) {
      this.users.push(res);
      this.$store.commit("admin/GET_USERS", this.users);
    },
    async updateUsers(res) {
      let findUser = this.users.findIndex((el) => el.id === res.id);
      if (findUser !== -1) {
        this.users.splice(findUser, 1, res);
        this.$store.commit("admin/GET_USERS", this.users);
      }
    },

    async removeUser(user) {
      try {
        let findProduct = this.users.findIndex((el) => el.id === user.id);
        await axios
          .delete(`https://fakestoreapi.com/users/${user.id}`)
          .then((response) => {
            console.log(response);
            this.users.splice(findProduct, 1);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        return e;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  margin-bottom: 20px;
}

.button.button-small {
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
}

td input[type="text"],
td select {
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 2px 8px;
}

th:last-child {
  text-align: right;
}

td:last-child {
  text-align: right;
}

td:last-child .button {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0px;
  margin-bottom: 0px;
  margin-right: 5px;
  background-color: #fff;
}

td:last-child .button .fa {
  line-height: 30px;
  width: 30px;
}
</style>
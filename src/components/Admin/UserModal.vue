<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="modalEle"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="removeData()"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label"
              >FirstName</label
            >
            <div class="col-lg-9">
              <input
                class="form-control"
                type="text"
                v-model="name.firstname"
              />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >LastName</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="text" v-model="name.lastname" />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Email</label
            >
            <div class="col-lg-9">
              <input
                class="form-control"
                @change="isEmailValid"
                v-model="email"
                type="email"
              />

              <span v-show="wrongEmail" style="color: red"
                >Incorrect email address</span
              >
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >UserName</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="text" v-model="username" />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Password</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="password" v-model="password" />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Street</label
            >
            <div class="col-lg-9">
              <input
                class="form-control"
                type="text"
                v-model="address.street"
              />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >City</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="text" v-model="address.city" />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >ZipCode</label
            >
            <div class="col-lg-9">
              <input
                class="form-control"
                type="text"
                v-model="address.zipcode"
              />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Latitude
            </label>
            <div class="col-lg-9">
              <input
                class="form-control"
                type="text"
                v-model="address.geolocation.latitude"
              />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Longitude</label
            >
            <div class="col-lg-9">
              <input
                class="form-control"
                type="text"
                v-model="address.geolocation.longitude"
              />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Phone</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="text" v-model="phone" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="mode === 'Update' ? editUser(user) : addUser()"
          >
            {{ mode }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="removeData()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import axios from "axios";
export default {
  props: ["open", "fields", "mode"],
  data() {
    return {
      wrongEmail: false,
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
    };
  },

  async mounted() {},

  created() {},
  watch: {
    fields: function (newVal) {
      this.email = newVal.email;
      this.username = newVal.username;
      this.password = newVal.password;
      this.name.firstname = newVal.firstname;
      this.name.lastname = newVal.lastname;
      this.address.city = newVal.city;
      this.address.street = newVal.street;
      this.address.number = newVal.number;
      this.address.zipcode = newVal.zipcode;
      this.phone = newVal.phone;
      this.address.geolocation.latitude = newVal.latitude;
      this.address.geolocation.longitude = newVal.longitude;
    },
  },

  methods: {
    isEmailValid() {
      const emailRe =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email.match(emailRe)) {
        this.wrongEmail = false;
      } else {
        console.log(emailRe.test(this.email));
        this.wrongEmail = true;
      }
    },
    removeData() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.name.firstname = "";
      this.name.lastname = "";
      this.address.city = "";
      this.address.street = "";
      this.address.number = "";
      this.address.zipcode = "";
      this.phone = "";
      this.address.geolocation.latitude = "";
      this.address.geolocation.longitude = "";
    },
    async addUser() {
      try {
        const details = {
          email: this.email,
          username: this.username,
          password: this.password,
          name: {
            firstname: this.name.firstname,
            lastname: this.name.lastname,
          },
          address: {
            city: this.address.city,
            street: this.address.street,
            number: this.address.number,
            zipcode: this.address.zipcode,
            geolocation: {
              lat: this.address.geolocation.latitude,
              long: this.address.geolocation.longitude,
            },
          },
          phone: this.phone,
        };

        this.$emit("add", details);
        console.log("DETAILSS", details);
        axios
          .post("https://fakestoreapi.com/users", {
            data: details,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    async editUser() {
      const editDetails = {
        email: this.email,
        username: this.username,
        password: this.password,
        name: {
          firstname: this.name.firstname,
          lastname: this.name.lastname,
        },
        address: {
          city: this.address.city,
          street: this.address.street,
          number: this.address.number,
          zipcode: this.address.zipcode,
          geolocation: {
            lat: this.address.geolocation.latitude,
            long: this.address.geolocation.longitude,
          },
        },
        phone: this.phone,
      };
      try {
        await axios
          .put(`https://fakestoreapi.com/users/${this.fields.id}`, {
            data: editDetails,
          })
          .then((response) => {
            console.log(response);
            this.$emit("updateUser", response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        return e;
      }
    },
    closeModal() {
      this.removeData();
      this.$emit("toggle-modal", false);
    },
  },
};
</script>

<style lang="scss" scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
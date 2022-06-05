<template>
  <div>
    <div class="mx-72 text-left p-2 grid grid-cols-1 h-screen">
      <!-- Users -->

      <div
        class="bg-blue-500 text-white p-4 rounded-xl h-full overflow-y-scroll"
      >
        <div class="p-2 border-b-4 border-b-blue-300">
          <h1 class="font-bold text-4xl mb-5">Administrator Tab</h1>
        </div>
        <div
          v-for="user in users"
          :key="user.userName"
          class="grid grid-cols-7 bg-white shadow-2xl text-black mt-4 rounded-xl"
        >
          <div class="col-start-1 col-span-1">
            <img width="75" height="75" class="p-1" src="/public/Logo.png" />
          </div>
          <div class="inline-block align-middle col-start-2 col-span-3">
            <span class="font-bold">Name: {{ user.name }}</span
            ><br />
            <span class="text-xs">Username: @{{ user.userName }}</span
            ><br />
            <span>Role: {{ user.userRole }} </span>
            <br />
            <span class="text-xs"
              >Account created at: {{ user.createdAt }}</span
            >
          </div>
          <div class="col-start-6">
            <button
              class="bg-black rounded-lg text-white p-1 m-1 hover:bg-blue-600 duration-200"
              v-if="user.userRole != 'manager' && self != user.userName"
              @click="changeAdminRights(true, user.userName)"
            >
              Set Administrator
            </button>
            <button
              class="bg-red-600 rounded-lg text-white p-1 m-1 hover:bg-blue-600 duration-200"
              v-if="user.userRole == 'manager' && self != user.userName"
              @click="changeAdminRights(false, user.userName)"
            >
              Remove Admin Rights</button
            ><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";

export default {
  name: "AdminControl",
  data() {
    return {
      users: [],
      self: "",
    };
  },

  methods: {
    completedFields(inputs) {
      let status = true;

      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i]) {
          status = false;
        }
      }

      this.dataComplete = status;
      return;
    },
    isValidEmail(email) {
      let status = true;

      if (
        this.newUser.email.length < 8 &&
        !email.includes("@") &&
        !this.newUser.email.includes(".com")
      ) {
        status = false;
      }

      this.emailComplete = status;
      return;
    },

    formatDates(dates) {
      for (let i = 0; i < dates.length; i++) {
        const element = dates[i];
        element.createdAt = moment(element.createdAt).format("MMMM Do YYYY");
      }

      return dates;
    },

    changeAdminRights(status, userName) {
      const tokenConfig = {
        headers: {
          Authorization: "Bearer " + this.$cookie.get("kwetterToken"),
        },
      };

      const apiHost = import.meta.env.VITE_API_HOST;
      axios
        .put(
          `http://${apiHost}/api/user-log-gateway/admin/rights`,
          { status, userName },
          tokenConfig
        )
        .then((res) => {
          //Perform Success Action
          if (res.data) window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.status);
          alert("An error has occured, please try again!");
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },

  mounted() {
    const tokenConfig = {
      headers: {
        Authorization: "Bearer " + this.$cookie.get("kwetterToken"),
      },
    };

    const apiHost = import.meta.env.VITE_API_HOST;
    axios
      .get(`http://${apiHost}/api/user-log-gateway/all`, tokenConfig)
      .then((res) => {
        //Perform Success Action
        console.log(res);
        this.users = res.data;
        this.formatDates(this.users);
      })
      .catch((error) => {
        console.log(error.response.status);
        alert("An error has occured, please try again!");
      })
      .finally(() => {
        //Perform action in always
      });

    const userData = jwt_decode(this.$cookie.get("kwetterToken"));
    this.self = userData.userName;
  },
};
</script>

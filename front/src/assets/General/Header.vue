<template>
  <header
    v-if="$route.meta.header != 0"
    class="
      bg-blue-600
      p-2
      pl-5
      pr-5
      text-white
      font-mono
      shadow-xl
      sticky
      top-0
      w-full
    "
  >
    <table class="w-full">
      <tbody>
        <tr class="float-left">
          <i
            v-on:click="actionMenu"
            class="fas fa-bars mr-5 sm:hidden outline-none border-none"
          ></i>
          <img
            height="50"
            width="50"
            class="inline-block mr-2"
            :src="'/public/Logo.png'"
          />
          <router-link to="/feed" class="font-bold text-xl">Kwetter</router-link>
        </tr>
        <tr class="sm:float-right sm:block hidden">
          <router-link
            v-if="userProfile.role == 1"
            to="/administrator"
            class="sm:mr-5 mr-3 hover:text-black focus:outline-none"
            >Administrate</router-link
          >
          <router-link
            v-if="userProfile.role == 2"
            to="/manage"
            class="sm:mr-5 mr-3 hover:text-black focus:outline-none"
            >Manage</router-link
          >
          <router-link
            :to="'/profile/' + userProfile.name"
            class="sm:mr-5 mr-3 hover:text-black focus:outline-none"
          >
            <img
              height="40"
              width="40"
              class="inline-block mr-2 p-1 hover:bg-black bg-white rounded-full"
              :src="'/public/Logo.png'"
            />
            <span>{{ userProfile.name }}</span>
          </router-link>
          <router-link
            @click="logOut"
            to="/"
            class="sm:mr-5 mr-3 hover:text-black focus:outline-none"
            >Logout <i class="fas fa-solid fa-door-open"></i
          ></router-link>
        </tr>
      </tbody>
    </table>
  </header>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "Header",
  data() {
    return {
      menuPanel: false,
      search: "",
      userProfile: {
        name: "",
        role: 0,
        userPicture: "",
      },
    };
  },
  methods: {
    actionMenu() {
      this.menuPanel = !this.menuPanel;
    },

    logOut() {
      this.$cookie.delete("kwetterToken");
    },
  },

  mounted() {
    const userData = jwt_decode(this.$cookie.get("kwetterToken"));
    this.userProfile.name = userData.userName;

    if(userData.role == 'manager') this.userProfile.role = 1;
  },
};
</script>
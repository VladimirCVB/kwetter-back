<template>
  <div class="shadow-xl">
    <div class="mx-80 text-left p-5">
      <img
        height="150"
        width="150"
        class="rounded-full bg-black p-3"
        :src="'/public/Logo.png'"
      />
      <div class="block font-bold">
        <span
          >{{ name }} <span class="text-xs">@{{ userName }}</span></span
        >
        <br />
        <span>{{ kweets }} Kweets</span><br />
        <span>{{ following }} Following</span><br />
        <span>{{ followers }} Followers</span><br />
        <router-link
          @click="deleteAccount"
          v-if="ownProfile"
          to="/"
          class="bg-red-500 px-2 py-1 rounded-lg text-white hover:bg-green-500 duration-200"
        >
          Delete Account
        </router-link>
        <button
          v-if="followStatus == 0 && !ownProfile"
          class="bg-blue-600 px-2 py-1 rounded-lg text-white hover:bg-green-500 duration-200"
        >
          Follow
        </button>
        <button
          v-if="followStatus == 1 && !ownProfile"
          class="bg-blue-600 px-2 py-1 rounded-lg text-white hover:bg-green-500 duration-200"
        >
          Unfollow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "ProfileInfo",
  data() {
    return {
      name: "",
      userName: "",
      kweets: 0,
      following: 7,
      followers: 0,
      friends: [],
      userImage: "",
      followStatus: 0,
      ownProfile: true,
    };
  },

  methods: {
    deleteAccount() {
      const tokenConfig = {
        headers: {
          Authorization: "Bearer " + this.$cookie.get("kwetterToken"),
        },
      };

      const apiHost = import.meta.env.VITE_API_HOST;

      axios
        .delete(
          `http://${apiHost}/api/user-log-gateway/delete-log/` + this.userName,
          tokenConfig
        )
        .then(() => {
          alert("Your account has been deleted!");
          this.$cookie.delete("kwetterToken");
        });
    },
  },

  mounted() {
    this.userName = this.$route.params.userName;
    const userName = this.$route.params.userName;

    const tokenConfig = {
      headers: {
        Authorization: "Bearer " + this.$cookie.get("kwetterToken"),
      },
    };

    const apiHost = import.meta.env.VITE_API_HOST;
    axios
      .get(
        `http://${apiHost}/api/user-log-gateway/user-name/` + userName,
        tokenConfig
      )
      .then((res) => {
        axios
          .get(
            `http://${apiHost}/api/user-gateway/user-profile/` + res.data.id,
            tokenConfig
          )
          .then((userRes) => {
            // Own Profile
            if (
              jwt_decode(this.$cookie.get("kwetterToken")).id !=
              userRes.data.userData.id
            )
              this.ownProfile = false;

            // User Data
            this.name = userRes.data.userData.lastName;
            this.userName = userRes.data.postData[0].userName;

            // User Posts
            this.kweets = userRes.data.postData.length;

            // User Follow Data
            this.following = userRes.data.userFollow.userFollowed.length;
            this.followers = userRes.data.userFollow.userFollowing.length;
          });
      });
  },
};
</script>

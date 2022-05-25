<template>
  <div>
    <div class="mx-52 text-left p-2 grid grid-cols-3 gap-8 h-screen">
      <!-- Description Tab -->

      <div class="bg-blue-500 text-white p-4 rounded-xl h-full">
        <div class="p-2 mb-4 border-b-4 border-b-blue-300">
          <h1 class="font-bold text-4xl mb-5">Description</h1>
        </div>
        <button
          class="
            bg-white
            text-black
            p-2
            w-full
            rounded-xl
            hover:bg-black hover:text-white
            ease-in-out
            duration-200
          "
        >
          Edit Description
        </button>
        <div class="mt-5">
          <div class="inline-block mr-2 text-2xl text-center">
            <font-awesome-icon icon="circle-user" /><br />
            <font-awesome-icon icon="graduation-cap" /><br />
            <font-awesome-icon icon="info" />
          </div>
          <div class="inline-block text-2xl">
            <p>{{ userProfile.website }}</p>
            <p>Studied At {{ userProfile.study }}</p>
            <p>Bio</p>
          </div>
        </div>
        <p class="text-justify p-2">{{ userProfile.bio }}</p>
      </div>

      <!-- Posts Tab -->

      <div class="overflow-y-scroll h-screen">
        <div class="bg-blue-500 text-white rounded-xl p-2">
          <div>
            <img
              height="50"
              width="50"
              class="inline-block bg-white rounded-full p-2 mb-2 mr-2"
              :src="'/public/Logo.png'"
            />
            <span class="font-bold"
              ><span> @{{ userName }}</span></span
            >
          </div>

          <form v-on:submit.prevent="newPost">
            <textarea
              v-model="newPostMessage"
              maxlength="140"
              class="w-full rounded-xl outline-none text-black p-2"
              placeholder="Write your message here..."
            ></textarea>
            <input
              class="
                hover:bg-black hover:text-white
                cursor-pointer
                block
                bg-white
                text-black
                rounded-lg
                w-full
                ease-in-out
                duration-200
              "
              type="submit"
              value="Create New Post"
            />
          </form>
        </div>

        <div
          v-for="post in userPosts"
          :key="post.createdAt"
          class="bg-blue-500 text-white rounded-xl p-3 mt-3 drop-shadow-xl"
        >
          <div class="grid grid-cols-5 gap-4 border-b-4 border-blue-300 p-2">
            <div>
              <img
                height="150"
                width="150"
                class="rounded-full bg-black p-3"
                :src="'/public/Logo.png'"
              />
            </div>

            <div class="col-start-2 col-end-4">
              <p>
                <span>@{{ post.userName }}</span>
              </p>
              <p>{{ post.createdAt }}</p>
              <font-awesome-icon icon="heart" class="text-red-600" />
              <p class="inline-block ml-1">{{ post.hearts }} Hearts</p>
            </div>

            <div class="col-end-6 content-center text-center">
              <img
                height="50"
                width="50"
                class="p-1 inline-block"
                :src="'/public/Logo.png'"
              />
              <span class="font-bold text-sm">Kwetter</span>
            </div>
          </div>
          <div class="mt-5">
            <p class="text-justify">{{ post.text }}</p>
          </div>
        </div>
      </div>

      <!-- Following Tab -->

      <div class="bg-blue-500 text-white p-4 rounded-xl h-screen w-auto">
        <div class="p-2 mb-4 border-b-4 border-b-blue-300">
          <h1 class="font-bold text-4xl mb-5">Following</h1>
        </div>
        <div class="grid grid-cols-4 p-2">
          <div
            v-for="follower in userFollowers"
            :key="follower.userName"
            class="text-center content-center m-4"
          >
            <img class="p-1" :src="follower.userImage" />
            <span>{{ follower.userName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment";

export default {
  name: "ProfilePosts",
  data() {
    return {
      user: true,
      userName: "",

      newPostMessage: "",

      userProfile: {
        website: "",
        study: "",
        bio: "",
      },

      userPosts: [],

      userFollowers: [
        { userName: "Vlad", userImage: "/public/Logo.png" },
        { userName: "John", userImage: "/public/Logo.png" },
        { userName: "Yanna", userImage: "/public/Logo.png" },
        { userName: "Silvia", userImage: "/public/Logo.png" },
        { userName: "Florin", userImage: "/public/Logo.png" },
        { userName: "Vik", userImage: "/public/Logo.png" },
        { userName: "JKD", userImage: "/public/Logo.png" },
      ],
    };
  },

  methods: {
    formatDates(dates) {
      for (let i = 0; i < dates.length; i++) {
        const element = dates[i];
        element.createdAt = moment(element.createdAt).format("MMMM Do YYYY");
      }

      return dates;
    },

    newPost() {
      if (this.newPostMessage == null || this.newPostMessage == "")
        return alert("You must add a message before posting!");
      const userData = jwt_decode(this.$cookie.get("kwetterToken"));
      const postData = {
        userId: userData.id,
        userName: userData.userName,
        text: this.newPostMessage,
        trends: [],
      };

      axios
        .post("http://localhost:3000/api/post-gateway/create-post", postData)
        .then((res) => {
          //Perform Success Action
          console.log(res);
          this.userPosts.push(res.data);
          this.formatDates(this.userPosts);
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
    const userName = this.$route.params.userName;
    const userData = jwt_decode(this.$cookie.get("kwetterToken"));
    this.userName = userData.userName;

    const tokenConfig = {
      headers: {
        Authorization: "Bearer " + this.$cookie.get("kwetterToken"),
      },
    };

    axios
      .get(
        "http://localhost:3000/api/user-log-gateway/user-name/" + userName,
        tokenConfig
      )
      .then((res) => {
        axios
          .get(
            "http://localhost:3000/api/user-gateway/user-profile/" +
              res.data.id,
            tokenConfig
          )
          .then((res) => {
            this.userProfile.website = res.data.userData.web;
            this.userProfile.study = res.data.userData.school;
            this.userProfile.bio = res.data.userData.bio;

            this.userPosts = res.data.postData;
            this.formatDates(this.userPosts);
          });
      });
  },
};
</script>
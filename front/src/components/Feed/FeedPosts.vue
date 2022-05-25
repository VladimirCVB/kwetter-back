<template>
  <div>
    <div class="mx-52 text-left p-2 grid grid-cols-3 gap-8 h-screen">
      <!-- Description Tab -->

      <div
        class="bg-blue-500 text-white p-4 rounded-xl h-full overflow-y-scroll"
      >
        <div class="p-2 border-b-4 border-b-blue-300">
          <h1 class="font-bold text-4xl mb-5">Mentions</h1>
        </div>
        <div
          v-for="mention in mentions"
          :key="mention.userName"
          class="
            grid grid-cols-3
            bg-white
            shadow-2xl
            text-black
            mt-4
            rounded-xl
          "
        >
          <div>
            <img width="75" height="75" class="p-1" :src="mention.userImage" />
          </div>
          <div class="inline-block align-middle">
            <span class="font-bold">{{ mention.name }}</span
            ><br />
            <span class="text-xs">{{ mention.userName }}</span
            ><br />
            <span>{{ mention.date }}</span>
          </div>
          <div>
            <p>{{ mention.text }}</p>
          </div>
        </div>
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
            <router-link :to="'/profile/' + userName">
              <span class="font-bold"
                ><span> @{{ userName }}</span></span
              >
            </router-link>
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
          v-for="post in feedPosts"
          :key="post.userName"
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
              <router-link :to="'/profile/' + post.userName">
                <p>@{{ post.userName }}</p>
              </router-link>
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
          <h1 class="font-bold text-4xl mb-5">Trending</h1>
        </div>

        <div class="mb-3" v-for="trend in trends" :key="trend">
          <p class="text-3xl font-bold">{{ trend }}</p>
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
      userData: {
        name: "",
        userName: "",
      },

      newPostMessage: "",

      mentions: [
        {
          name: "Deas",
          userName: "@deassino",
          userImage: "/public/Logo.png",
          date: "12.01.2022",
          text: "I wonder about you @johnnytest",
        },
      ],

      feedPosts: [],

      trends: ["#Lorem", "#Ipsum", "#Nice", "#Awesome"],
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
      const userDataToken = jwt_decode(this.$cookie.get("kwetterToken"));
      const postData = {
        userId: userDataToken.id,
        userName: userDataToken.userName,
        text: this.newPostMessage,
        trends: [],
      };

      axios
        .post("http://localhost:3000/api/post-gateway/create-post", postData)
        .then((res) => {
          //Perform Success Action
          console.log(res);
          this.feedPosts.push(res.data);
          this.formatDates(this.feedPosts);
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

    axios
      .get("http://localhost:3000/api/post-gateway/feed")
      .then((res) => {
        //Perform Success Action
        this.feedPosts = res.data;
        this.formatDates(this.feedPosts);
      })
      .catch((error) => {
        console.log(error.response.status);
        alert("An error has occured, please try again!");
      })
      .finally(() => {
        //Perform action in always
      });
  },
};
</script>
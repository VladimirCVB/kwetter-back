import { createRouter, createWebHistory } from "vue-router";
import RegistrationView from "../views/RegistrationView.vue";

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
    and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "registration",
      component: RegistrationView,
      meta: {
        header: 0,
      },
    },
    {
      path: "/profile/:userName",
      name: "profile",
      beforeEnter: () => {
        if (!getCookie("kwetterToken"))
          return router.push({ name: "registration" });
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/feed",
      name: "feed",
      beforeEnter: () => {
        if (!getCookie("kwetterToken"))
          return router.push({ name: "registration" });
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/FeedView.vue"),
    },
    {
      path: "/administrator",
      name: "administrator",
      beforeEnter: () => {
        if (!getCookie("kwetterToken"))
          return router.push({ name: "registration" });
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/management",
      name: "management",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdminView.vue"),
    },
    // {
    //   path: '/second',
    //   name: 'registration',
    //   component: RegistrationView,
    //   meta: {
    //     header: 1
    //   }
    // },
  ],
});

export default router;

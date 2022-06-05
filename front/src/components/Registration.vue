<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Registration",
  props: {},
  data() {
    return {
      logIn: {
        email: "",
        password: "",
      },
      register: {
        userName: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      completedRegister: true,
      completedLogin: true,
      validEmail: true,
      validLoginEmail: true,
      sent: false,
      registerFinish: false,
    };
  },
  methods: {
    //CHECK VALIDATION
    completedFields(inputs, instance) {
      let status = true;

      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i]) {
          status = false;
        }
      }

      if (instance == 0) {
        this.completedRegister = status;
        return status;
      }

      this.completedLogin = status;
      return status;
    },
    isValidEmail(email, instance) {
      let status = true;

      if (email.length < 8 && !email.includes("@") && !email.includes(".com")) {
        status = false;
      }

      if (instance == 0) {
        this.validEmail = status;
        return status;
      }

      this.validLoginEmail = status;
      return status;
    },

    //SUBMIT
    registerNew() {
      const registrationFields = [
        this.register.email,
        this.register.lastName,
        this.register.userName,
        this.register.password,
      ];
      const validFields = this.completedFields(registrationFields, 0);
      const validEmail = this.isValidEmail(this.register.email, 0);


      if (validEmail && validFields) {
        const apiHost = import.meta.env.VITE_API_HOST;
        axios
          .post(
            `http://${apiHost}/api/user-log-gateway/create-log`,
            this.register
          )
          .then((res) => {
            //Perform Success Action
            console.log(res);
            if (res.data != null || res.data != "") this.registerFinish = true;
          })
          .catch((error) => {
            console.log(error.response.status);
            alert("An error has occured, please try again!");
          })
          .finally(() => {
            //Perform action in always
          });
      }
    },

    logUser() {
      const logInFields = [this.logIn.email, this.logIn.password];
      const validFields = this.completedFields(logInFields, 0);

      if (validFields) {
        const apiHost = import.meta.env.VITE_API_HOST;
        axios
          .post(`http://${apiHost}/api/user-gateway`, this.logIn)
          .then((res) => {
            this.$cookie.set("kwetterToken", res.data.access_token, {
              expires: "900s",
            });

            const userName = jwt_decode(res.data.access_token).userName;
            this.$router.push("/profile/" + userName);
            console.log(res);
          })
          .catch((error) => {
            alert("Credentials not matching! Try again!");
            console.log(error);
          })
          .finally(() => {
            //Perform action in always
          });
      }
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-2 divide-x w-full h-screen">
    <!-- Logo and Image -->
    <div
      class="bg-[url('/public/registration-background.jpg')] bg-no-repeat bg-cover"
    >
      <div class="w-full h-full bg-blue-500 bg-opacity-40">
        <img
          class="object-none object-center inline-block"
          alt="Kwetter logo"
          :src="'/public/Logo.png'"
        />
        <h1
          class="font-bold text-7xl bg-gradient-to-r from-cyan-500 to-white text-black"
        >
          Kwetter
        </h1>
      </div>
    </div>

    <!-- Registration & Log In Forms -->
    <div class="m-10 divide-y divide-dashed">
      <h1 class="font-bold text-5xl mb-10 w-2/3">Now or Never</h1>

      <!-- Registration -->
      <form v-on:submit.prevent="registerNew" class="w-2/3 mb-10 p-5">
        <span class="font-bold text-2xl">Join Kwetter Now</span>
        <div class="bg-white rounded-lg shadow-lg mb-2 m-auto">
          <i class="fas fa-solid fa-envelope text-blue-800"></i>
          <input
            class="w-2/3 p-1 text-center outline-none"
            type="text"
            v-model="register.email"
            name="email"
            placeholder="Email"
            @keyup="isValidEmail(register.email, 0)"
          />
        </div>
        <div class="bg-white rounded-lg shadow-lg mb-2 m-auto">
          <i class="fas fa-solid fa-user text-blue-800"></i>
          <input
            class="w-2/3 p-1 text-center outline-none"
            type="name"
            v-model="register.lastName"
            name="lastName"
            placeholder="Name"
            @keyup="
              completedFields(
                [
                  register.email,
                  register.lastName,
                  register.userName,
                  register.password,
                ],
                0
              )
            "
          />
        </div>
        <div class="bg-white rounded-lg shadow-lg mb-2 m-auto">
          <i class="fas fa-solid fa-at text-blue-800"></i>
          <input
            class="w-2/3 p-1 text-center outline-none"
            type="text"
            v-model="register.userName"
            name="userName"
            placeholder="User Name"
            @keyup="
              completedFields(
                [
                  register.email,
                  register.name,
                  register.userName,
                  register.password,
                ],
                0
              )
            "
          />
        </div>
        <div class="bg-white rounded-lg shadow-lg mb-2 m-auto">
          <i class="fas fa-solid fa-key text-blue-800"></i>
          <input
            class="w-2/3 p-1 text-center outline-none"
            type="password"
            v-model="register.password"
            name="password"
            placeholder="Password"
            @keyup="
              completedFields(
                [
                  register.email,
                  register.name,
                  register.userName,
                  register.password,
                ],
                0
              )
            "
          />
        </div>
        <label class="text-red-600 font-bold m-auto" v-if="!validEmail"
          >You need to input a correct email address!</label
        >
        <input
          class="rounded-md mt-10 w-full bg-blue-600 text-white cursor-pointer text-lg hover:bg-green-500 hover:text-black hover:bg-solid hover:border-transparent hover:text-white ease-in-out duration-200"
          @click="
            completedFields(
              [
                register.email,
                register.name,
                register.userName,
                register.password,
              ],
              0
            )
          "
          type="submit"
          value="Register"
        />

        <label
          class="text-red-500 font-bold mt-5 block"
          v-if="!completedRegister"
          >All fields must be completed!</label
        >
        <label class="text-green-500 font-bold mt-5 block" v-if="registerFinish"
          >You have registered!</label
        >
      </form>

      <!-- Log In -->
      <form v-on:submit.prevent="logUser" class="w-2/3 p-5">
        <span class="font-bold text-2xl">Connect with us!</span>
        <div class="bg-white rounded-lg shadow-lg mb-2 m-auto">
          <i class="fas fa-solid fa-envelope text-blue-800"></i>
          <input
            class="w-2/3 p-1 text-center outline-none"
            type="text"
            v-model="logIn.email"
            name="email"
            placeholder="Email"
            @keyup="isValidEmail(logIn.email, 1)"
          />
        </div>
        <div class="bg-white rounded-lg shadow-lg mb-2 m-auto">
          <i class="fas fa-solid fa-key text-blue-800"></i>
          <input
            class="w-2/3 p-1 text-center outline-none"
            type="password"
            v-model="logIn.password"
            name="password"
            placeholder="Password"
            @keyup="completedFields([logIn.email, logIn.password], 1)"
          />
        </div>
        <label class="text-red-600 font-bold" v-if="!validLoginEmail"
          >You must enter a correct email address!</label
        >
        <input
          class="rounded-md mt-10 w-full bg-blue-600 text-white cursor-pointer text-lg hover:bg-green-500 hover:text-black hover:bg-solid hover:border-transparent hover:text-white ease-in-out duration-200"
          type="submit"
          value="Log In"
        />
        <label class="text-red-500 font-bold mt-5 block" v-if="!completedLogin"
          >All fields must be completed!</label
        >
      </form>
    </div>
  </div>
</template>

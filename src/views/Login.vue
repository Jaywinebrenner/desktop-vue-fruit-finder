<template>
<div class="loginWrapper">

    <div class="loginCard">
  <div v-if="error" class="error">{{error.message}}</div>
  <form @submit.prevent="pressedLogin">
    <h3>Login</h3>
    <div class="email">
      <input type="email" v-model="email" placeholder="email">
    </div>
    <div class="password">
      <input type="password" v-model="password" placeholder="password">
    </div>
    <button type="submit" class="signUpButton">
      <b-spinner small v-if="spinLoading" label="Spinning"></b-spinner>
      <span v-if="!spinLoading">Login</span>
    </button>

  </form>
  </div>


</div>
  
</template>

<script>

import * as firebase from "firebase/app"
import "firebase/auth";

export default {
  name:"Login",
  props: {
    showView: Function
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      spinLoading: false
    }
  },
  methods: {
    async pressedLogin() {
      this.spinLoading = true;
      try {
        const value = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.showView("Map")
        console.log("value after pressing login", value);
        this.spinLoading = false;
      } catch (err) {
        this.$toastr.e(
            err
          );
        console.log(err);
        this.spinLoading = false;
      }
    },
  },

}
</script>

<style lang="scss">
@import '../styles/style.scss';

.loginWrapper {
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
}

.loginCard {
  background-color: white;
  padding: 20px;
  border: 1px black solid;
  border-radius: 2%;
}

.error {
  color: red;
  font-size: 18px;
}

div > input {
  margin-bottom: 20px;
  width: 35vh;
  height: 35px;

}

.signUpButton {
  background-color: $primary;
  width: 35vh;
  height: 75px;
  font-size: 100%;
  color: white;
}




</style>
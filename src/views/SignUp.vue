<template>
<div class="loginWrapper">

  <div class="loginCard">
  <div v-if="error" class="error">{{error.message}}</div>
  <form @submit.prevent="pressedSignUp">
    <h3>Sign Up</h3>
    <div class="email">
      <input type="email" v-model="email" placeholder="email">
    </div>
    <div class="password">
      <input type="password" v-model="password" placeholder="password">
    </div>

    <button type="submit" class="signUpButton">
      <b-spinner small v-if="spinLoading" label="Spinning"></b-spinner>
      <span v-if="!spinLoading">Sign Up</span>
    </button>


  </form>
  </div>

</div>
  
</template>

<script>

import * as firebase from "firebase/app"
import "firebase/auth";


export default {
  name:"SignUp",
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
    async pressedSignUp() {
      this.spinLoading = true;
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        // this.$router.replace({name: '/'})
        // this.$router.push('/')
        this.showView("Map")
        this.$toastr.s(
              "You have successfully created an account. Happy hunting!"
            );
        console.log("user", user);
        this.spinLoading = false;

      } catch (err) {
        console.log(err);
            this.$toastr.e(
              err
            );
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
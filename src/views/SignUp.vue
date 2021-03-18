<template>
<div class="loginWrapper">

  <div class="loginCard">
  <div v-if="error" class="error">{{error.message}}</div>
  <form @submit.prevent="pressedSignUp">
    <h3>Sign Up</h3>
    <div>
      <input type="text" v-model="name" placeholder="Fred McTree">
    </div>
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
      name: '',
      error: '',
      spinLoading: false
    }
  },
  methods: {
    async pressedSignUp() {
      this.spinLoading = true;
      if (!this.name) {
        this.$toastr.s(
              "Please enter your name. But, ya know, it doesn't have to be your real name."
            );
            this.spinLoading = false;
        return;
      }

      // firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      // .then(
      //   (user)=>{
      //     if(user){
      //       user.updateProfile({
      //         displayName: this.name
      //       }).then(
      //         (s)=> // perform any other operation
            
      //     }
      // })
      // .catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // ...
      // });
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        firebase.auth().currentUser.updateProfile({
          displayName: this.name
        })
        this.showView("Map");
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
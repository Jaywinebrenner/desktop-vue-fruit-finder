<template>
<div class="loginWrapper">
  <div class="loginCard">
  <div v-if="error" class="error">{{error.message}}</div>
  <form @submit.prevent="pressed">
    <h3>Sign Up</h3>
    <div class="email">
      <input type="email" v-model="email" placeholder="email">
    </div>
    <div class="password">
      <input type="password" v-model="password" placeholder="password">
    </div>
    <button type="submit">Sign Up</button>
  </form>


  </div>
</div>
  
</template>

<script>

import * as firebase from "firebase/app"
import "firebase/auth";

export default {
  methods: {
    async pressed() {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$router.replace({name: '/'})
        console.log("user", user);

      } catch (err) {
        console.log(err);
      }
    }
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  }

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

button {
  background-color: $primary;
  width: 35vh;
  height: 75px;
  font-size: 100%;
  color: white;
}




</style>
<template>

<div class="wholeNavbarWrapper">
    <div class="topNavbarWrapper">

        <div id="navbarLeft">
            <router-link class="routerLinksLeft" to="/">Home</router-link> 
            <router-link class="routerLinksLeft" to="/about">About</router-link>
        </div>

        <div  id="navbarRight">
            <router-link v-if="!isLoggedIn" class="routerLinkRight" to="/signUp">Sign Up</router-link>
            <router-link v-if="!isLoggedIn" class="routerLinkRight" to="/login">Login </router-link>
            <h5 v-else @click="logout" class="logoutText">Logout</h5>
        </div>

    </div>

      <div class="logoWrapper">
          <img class='splashLogo' alt="Vue logo" src="../assets/newLogo.png">
          <div v-if="isLoggedIn" class="addTreeButtonWrapper">
            <button @click="showAddTreeModal" class="addTreeButton">Add Tree</button>
          </div>
      </div>

    </div>
    
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth";

export default {
  name:"navbar",
  props: ['hideAddTreeModal', 'showAddTreeModal', 'formData', 'treeType', 'description', 'street', 'city', 'zip'],
  created() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.isLoggedIn = true;
          console.log("Are you logged in?", this.isLoggedIn)
        } else {
          this.isLoggedIn = false;
          console.log("Are you logged in?", this.isLoggedIn)
        }
    })
  },
  data() {
    return {
      isLoggedIn: null,
    }
  },
  methods: {

    async logout() {
      try {
        const data = await firebase.auth().signOut();
        console.log("logout data", data);
        this.$router.push('/')
      } catch (err) {
        console.log(err);
      }
    },
    
  }
  
}
</script>

<style lang="scss">
@import '../styles/style.scss';

.logoutText {
  color: white;
  cursor: pointer;
  margin-right: 20px;
}

.wholeNavbarWrapper {
  position: sticky;
  position: -webkit-sticky; 
  top: 0;
  padding-bottom: 5px;

}

.topNavbarWrapper {
   display: flex;

   background-color: #8D1F40;
   justify-content: space-between;
   align-items: center;
   height: 40px;
}

.routerLinksLeft {
  margin-left: 5px;
  font-size: 19px;
}

.routerLinkRight {
  margin-right: 40px;
  font-size: 14px;
}

#navbarLeft,  #navbarMiddle, #navbarRight {
  display: flex;
    margin-left: 10px;
    font-weight: bold;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #e3acac;
    }
  }
}

.navbarLeft {
  color: white;
  font-weight: bold;
}

.navbarMiddle {
  color: white;
  font-weight: bold;
}

.navbarRight {
  color: white;
  font-weight: bold;
  flex: .333;
}


.navbarLeft {

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
    .logoWrapper {
      background-color: white;
      display: flex;
      position: sticky;
      position: -webkit-sticky; 
      align-self: flex-start; 
      top: 0;
      align-items: center;
    }
  
    .splashLogo {
    width: 150px;
  }

  .addTreeButtonWrapper {
    margin-left: auto;
    padding: 0;
  
  }

  .addTreeButton {
  background-color: $primary;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-right: 20px;
  }

  .modalWrapper {
    
  }

</style>
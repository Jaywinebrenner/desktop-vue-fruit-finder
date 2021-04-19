<template>

<div class="wholeNavbarWrapper">
    <div class="topNavbarWrapper">

        <div id="navbarLeft">
          <!-- <button @click="test()">TEST</button> -->
            <!-- <router-link class="routerLinksLeft" to="/">Home</router-link> 
            <router-link class="routerLinksLeft" to="/about">About</router-link> -->
            <h5 @click="clickHomeButton()" class="routerLinkLeftOne">Home</h5>
            <h5 @click="showView('About'); " class="routerLinkLeftTwo">About</h5>
        </div>

        <div  id="navbarRight">
            <h5 @click="showView('SignUp')" v-if="!isLoggedIn" class="routerLinkRight">Sign Up</h5>
            <h5 @click="showView('Login')" v-if="!isLoggedIn" class="routerLinkRight">Login</h5>
            <!-- <h5 v-if="isLoggedIn" class="welcomeText">Welcome {{ currentUser ? currentUser.displayName : '' }}</h5> -->
            <h5 v-if="isLoggedIn" @click="logout" class="logoutText">Logout</h5>
        </div>

    </div>

      <div class="logoWrapper">
          <img class='splashLogo' alt="Vue logo" src="../assets/newLogo.png">
            <h5 v-if="isLoggedIn" class="welcomeText">Welcome {{ currentUser ? currentUser.displayName : '' }}</h5>
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
  props: {
    showView: Function,
    showAddTreeModal: Function,
    isLoggedIn: Boolean,
    getCurrentUser: Function,
    getCurrentUserID: Function,
    currentUser: Object,
    toggleMapAndListButton: Function
  },
  data() {
    return {
    }
  },
  methods: {
    test() {
      console.log("ROOT", this.$root.spinLoading)
    },
    clickHomeButton(){
        this.showView('Map'); 
        this.toggleMapAndListButton("showMap");
    },

    async logout() {
      try { 
        const data = await firebase.auth().signOut();
        console.log("logout data", data);
        this.showView("Map")
        this.toggleMapAndListButton("showMap")
        this.getCurrentUser();
        this.getCurrentUserID();
        this.$toastr.e(
            "You have successfully logged out of the Fruit Finder. See you soon!"
          );
      } catch (err) {
        this.$toastr.e(
            err
          );
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
   background-color: $primary;
   justify-content: space-between;
   align-items: center;
   height: 40px;
}

.routerLinksLeft {
  cursor: pointer;
  margin-left: 5px;
  // font-size: 19px;
}

.wholeNavbarWrapper {
  h5:hover {
    // color: $hover;
  }

}

.routerLinkRight {
  cursor: pointer;
  margin-right: 40px;
  // font-size: 14px;
}

#navbarLeft,  #navbarMiddle, #navbarRight {
  display: flex;
    // margin-left: 40px;
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
  padding-right: 40px;
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

.routerLinkLeftTwo, .routerLinkLeftOne {
  margin-left: 20px;
  margin-top: 5px;
  cursor: pointer;
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
    // margin-left: auto;
    padding: 0;
  
  }

  .addTreeButton {
  background-color: $primary;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-right: 20px;
  }

  .welcomeText {
    color: $primary;
    padding: 6px 6px 70px 0;
    font-size: .8rem;
    margin: 0 auto;
  }
  .welcomeText:hover {
    // color: green!important;
    cursor: pointer;
 
  }


</style>
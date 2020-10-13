<template>

<div class="wholeNavbarWrapper">
  <div class="topNavbarWrapper">

      <div id="navbarLeft">
          <router-link class="routerLinksLeft" to="/">Home</router-link> 
           <router-link class="routerLinksLeft" to="/about">About</router-link>
      </div>

      <div id="navbarRight">
          <router-link class="routerLinkRight" to="/login">Login / Sign Up</router-link>
      </div>

  </div>

    <div class="logoWrapper">
      <img class='splashLogo' alt="Vue logo" src="../assets/newLogo.png">
    </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      isLogginIn: false
    }
  }
  
}
</script>

<style lang="scss">
@import '../styles/style.scss';

.wholeNavbarWrapper {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0;
  padding-bottom: 5px;
  border-bottom: 1px black solid;
}

.topNavbarWrapper {
   display: flex;
   flex-direction: row;
   background-color: #8D1F40;
   justify-content: space-between;
    align-items: center;
   height: 40px;
}

.routerLinksLeft {
  margin-left: 20px;
}

.routerLinkRight {
  margin-right: 40px;
}

#navbarLeft,  #navbarMiddle, #navbarRight {
    margin-left: 30px;
    font-weight: bold;
  // flex: .333;

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
  // flex: .333;
}

.navbarMiddle {
  // flex: .333;
  color: white;
  font-weight: bold;
}

.navbarRight {
  color: white;
  font-weight: bold;
  flex: .333;
}

// .bottomNavbarWrapper {
//   background-color: #75b34e;
//   padding: 20px 0;

// }

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
      position: sticky;
      position: -webkit-sticky; /* for Safari */
      align-self: flex-start; /* <-- this is the fix */
      top: 0;
    }
  
    .splashLogo {
    width: 200px;
  }

</style>
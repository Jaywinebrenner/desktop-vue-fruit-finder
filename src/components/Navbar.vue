<template>

<div class="wholeNavbarWrapper">
  <div class="topNavbarWrapper">

      <div id="navbarLeft">
          <router-link to="/">Home</router-link> 
      </div>

      <div id="navbarMiddle">
           <router-link to="/about">About</router-link>
      </div>

      <div id="navbarRight">
          <router-link to="/login">Login / Sign Up</router-link>
      </div>


  </div>
    <div class="bottomNavbarWrapper">
      List View | Map View
     
     
    </div>

</div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
@import '../styles/style.scss';

.wholeNavbarWrapper {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  align-self: flex-start; /* <-- this is the fix */
  top: 0;
}

.topNavbarWrapper {
  display: flex;
  flex-direction: row;
  background-color: #8D1F40;
  justify-content: center;
   align-items: center;
  height: 40px;
}

#navbarLeft,  #navbarMiddle, #navbarRight {
    font-weight: bold;
  flex: .333;

  a {
    font-weight: bold;
    color: #e3acac;

    &.router-link-exact-active {
      color: white;
    }
  }
}

.navbarLeft {
  color: white;
  font-weight: bold;
  flex: .333;
}

.navbarMiddle {
  flex: .333;
  color: white;
  font-weight: bold;
}

.navbarRight {
  color: white;
  font-weight: bold;
  flex: .333;
}

.bottomNavbarWrapper {
  background-color: lightgreen;

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

</style>
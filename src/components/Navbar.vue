<template>

<div class="wholeNavbarWrapper">
  <div class="topNavbarWrapper">

      <div class="navbarLeft">
          Left
      </div>

      <div class="navbarMiddle">
          middle
      </div>

      <div class="navbarRight">
          right
      </div>


  </div>
    <div class="bottomNavbarWrapper">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
  // position: sticky;
  // position: -webkit-sticky; /* for Safari */
  // align-self: flex-start; /* <-- this is the fix */
  // top: 0;
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

</style>
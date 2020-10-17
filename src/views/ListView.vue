<template>
<div class="listViewWrapper">
  <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
    </div>
      <div class="mapListButtonWrapper">
       <router-link v-if="!isLoggedIn" class="viewButton" to="/"><button class="mapListButton">Map View</button></router-link>
       <router-link v-if="!isLoggedIn" class="viewButton" to="/listview"><button class="mapListButton">List View</button></router-link>
    </div>

</div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
@import "../styles/style.scss";

.listViewWrapper {
  background-color: $primary;
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.viewButton {

}

</style>
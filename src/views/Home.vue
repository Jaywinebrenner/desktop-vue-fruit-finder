<template>
  <div class="home">

    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you.</h5>
    </div>

    <div class="mapListButtonWrapper">
      <button class="mapListButton">Map View</button>
       <button class="mapListButton">ListView</button>
    </div>

  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang='scss'>
@import '../styles/style.scss';

.home {
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // @include flexCenter();
}

.homeSubheader {
  display:flex;
}

.homeText {
  color: white;
}

.mapListButtonWrapper {
  padding: 20px;
}

.mapListButton {
  background-color: white;
  color: $primary;
  margin-right: 10px;
  width: 90px;
  height: 30px;
  border-radius: 5%;
}



</style>

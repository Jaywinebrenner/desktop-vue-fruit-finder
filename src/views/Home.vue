<template>
  <div class="home">

    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you.</h5>
    </div>

    <div class="mapListButtonWrapper">
      <button class="mapListButton">Map View</button>
       <button class="mapListButton">ListView</button>
    </div>

    <div class="mapWrapper">
      <h6 style="color: white;">Your Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ coordinates.lat }} | Longitude: {{ coordinates.lng}}</p>

      <GmapMap
      class="mapObject"
        :center="{lat:10, lng:10}"
        :zoom="7"
    
      ></GmapMap>
    </div>

  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  created() {
      this.$getLocation({})
        .then(coordinates => {
          console.log(coordinates);
          this.coordinates = coordinates;
      })
      .catch(error => alert(error))
  },
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
}

.homeSubheader {
  display:flex;
}

.homeText {
  color: white;
}

.mapListButtonWrapper {
  padding: 10px;
}

.mapListButton {
  background-color: white;
  color: $primary;
  margin-right: 10px;
  width: 90px;
  height: 30px;
  border-radius: 5%;
}

.mapObject {
width:80vh; 
height:60vh;
margin-bottom: 4vh;
}



</style>

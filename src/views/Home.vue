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

<div>
      <h6 style="color: white;">Your Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ myCoordinates.lat }} | Longitude: {{ myCoordinates.lng}}</p>
</div>

<div>
      <h6 style="color: white;">Map Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ mapCoordinates.lat }} | Longitude: {{ mapCoordinates.lng}}</p>

</div>


      <GmapMap
      class="mapObject"
        :center="myCoordinates"
        :zoom="7"
        ref="mapRef"
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
      map: null,
      // mapCoordinates: {
      //   lat: 0,
      //   lng: 0
      // },
      myCoordinates: {
        lat: 0,
        lng: 0
      },
    }
  },
  created() {
      this.$getLocation({})
        .then(coordinates => {
          console.log(coordinates);
          
          this.myCoordinates = coordinates;
      })
      .catch(error => alert(error))
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => this.map = map);
    // this.map ? console.log("map object", this.map) : ''
  },
  computed: {
    mapCoordinates() {
      if(!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4)
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../styles/style.scss';

html, body {
  height: 100%
}


.home {
  background-color: $primary;
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.homeSubheader {
  // flex: .2;
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
width:90vh; 
height:60vh;
margin-bottom: 4vh;
}


.mapWrapper {
  overflow: hidden;
}



</style>

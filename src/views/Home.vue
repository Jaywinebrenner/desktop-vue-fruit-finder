<template>
  <div class="home">

    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
    </div>

    <div class="mapListButtonWrapper">
       <router-link v-if="!isLoggedIn" class="viewButton" to="/"><button class="mapListButton">Map View</button></router-link>
       <router-link v-if="!isLoggedIn" class="viewButton" to="/listview"><button class="mapListButton">List View</button> </router-link>
      <!-- <button class="mapListButton">Map View</button>
       <button class="mapListButton">List View</button> -->
    </div>

    <div class="mapWrapper">

<!-- <div class="temporaryCoordDiv">
<div>
      <h6 style="color: white;">Your Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ myCoordinates.lat }} | Longitude: {{ myCoordinates.lng}}</p>
</div> 
<div>
      <h6 style="color: white;">Map Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ mapCoordinates.lat }} | Longitude: {{ mapCoordinates.lng}}</p>

</div>
</div> -->


      <GmapMap
      class="mapObject"
       :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false,
          styles: styles
        }"
        :center="myCoordinates"
        :zoom="13"
        ref="mapRef"
        @dragend="handleDrag"
        scaleControl: false
  
      >
      <div v-if="fakeData.length > 0">
      <GmapMarker
   
        :position="myCoordinates"
        :clickable="true"
        :draggable="true"   
        @click="center-m.position"
      />
      </div>
      
      </GmapMap>
    </div>
    

  </div>
</template>

<script>
import { mapStyle } from "../constants/mapStyle.js";

export default {
  name: "Home",
  props: ['handleFormSubmit'],
  components: {},

  data() {
    return {
      fakeData: [
        {
          lat: 45.5055,
          lng: -122.5956
        },
        {
          lat: 45.5328,
          lng: -122.5758
        }
      ],
      styles: mapStyle,
      map: null,
      // mapCoordinates: {
      //   lat: 0,
      //   lng: 0
      // },
      myCoordinates: {
        lat: 0,
        lng: 0
      }
    };
  },

  methods: {
    handleDrag() {
      // get center and zoom level, and store it
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.myCoordinates.lat = position.coords.latitude
        this.myCoordinates.lng = position.coords.longitude
      },
      // error => {
      //   alert("Shit, there's an error.")
      // }
   )
  },

  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => (this.map = map));
    // this.fetchMapStyle();
  },

  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      }
      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4)
      };
    }
  }
};
</script>

<style lang='scss'>
@import "../styles/style.scss";

html,
body {
  height: 100%;
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

.homeText {
  font-size: 5vw;
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
  width: 95vw;
  height: 60vh;
  margin-bottom: 4vh;
}

.mapWrapper {
  overflow: hidden;
}

.temporaryCoordDiv {
  display: flex;
}
</style>

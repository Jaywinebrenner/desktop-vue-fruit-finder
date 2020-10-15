<template>
  <div class="home">

    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
    </div>

    <div class="mapListButtonWrapper">
      <button class="mapListButton">Map View</button>
       <button class="mapListButton">ListView</button>
    </div>

    <div class="mapWrapper">

<div class="temporaryCoordDiv">

<!-- <div>
      <h6 style="color: white;">Your Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ myCoordinates.lat }} | Longitude: {{ myCoordinates.lng}}</p>
</div> -->
<!-- 
<div>
      <h6 style="color: white;">Map Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ mapCoordinates.lat }} | Longitude: {{ mapCoordinates.lng}}</p>

</div> -->

</div>


      <GmapMap
      class="mapObject"
       :options="{
          zoomControl: true,
          mapTypeControl: true,
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
      <!-- <div v-if="allTrees.length > 0"> -->
      <GmapMarker
        :key="index"
        :position="myCoordinates"
        :clickable="true"
        :draggable="true"   
        @click="center-m.position"
      />
      <!-- </div> -->
      
      </GmapMap>
    </div>
    

  </div>
</template>

<script>
import { mapStyle } from "../constants/mapStyle.js";

export default {
  name: "Home",

  components: {},

  data() {
    return {
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
    // does the user have a saved center? use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      // get user's coordinates from browser request
      this.$getLocation({})
        .then(coordinates => {
          this.myCoordinates = coordinates;
        })
        .catch(error => alert(error));
    }
    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
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

.homeSubheader {
  // flex: .2;
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

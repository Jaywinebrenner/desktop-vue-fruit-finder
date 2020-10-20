<template>
  <div class="home">

    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
    </div>

    <div class="mapListButtonWrapper">
       <router-link v-if="!isLoggedIn" class="viewButton" to="/"><button class="mapListButton">Map View</button></router-link>
       <router-link v-if="!isLoggedIn" class="viewButton" to="/listview"><button class="mapListButton">List View</button> </router-link>
    </div>

    <div class="mapWrapper">

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

    <div v-if="allTrees.length > 0">
      <GmapMarker
        :position= myCoordinates 
        :clickable="true"
        :draggable="false"   
        @click="center-myCoordinates"

      />
    </div>

     <div v-for="(tree, index) in allTrees" :key="index">
        <GmapMarker
        :icon="{ url: require('../assets/customTreeSmall.png')}" 
        
        
        :v-if="tree.userID !== currentUserID" 
        :position= tree.coordinates
        :clickable="true"
        :draggable="true"
        @click="center=tree.coordinates"
      />
      </div>

      <!-- Light Tree Icon -->
      <div v-for="(tree, index) in allTrees" :key="index">
        <GmapMarker
        :icon="{ url: require('../assets/customTreeMyTreeSmall.png')}" 
        v-if="tree.userID === currentUserID"
        :position= tree.coordinates
        :clickable="true"
        :draggable="true"
        @click="center=tree.coordinates"
      />
      </div>

      </GmapMap>
    </div>
    

  </div>
</template>

<script>
import { mapStyle } from "../constants/mapStyle.js";
import db from '@/main.js'
// import firebase from 'firebase';



const allTreesMarker = require('../assets/customTreeSmall.png');
const myTreesMarker = require('../assets/customTreeMyTreeSmall.png');

export default {
  name: "Home",
  props: ['handleFormSubmit', 'currentUserID'],
  components: {},

  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => (this.map = map));
    console.log('HOME current user', this.currentUserID);

  },

  data() {
    return {
      yes: false,
      markerOptions: {
      url: 
      allTreesMarker,
      myTreesMarker

    },
      allTrees: [],
      isLoggedIn: false,
      styles: mapStyle,
      map: null,
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
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.myCoordinates.lat = position.coords.latitude
        this.myCoordinates.lng = position.coords.longitude
      },
   ),
   db.collection("locations").onSnapshot(res => {
      const changes = res.docChanges();
      console.log("changes", changes);
      changes.forEach(change => {
          this.allTrees.push({
            ...change.doc.data(),
            id: change.doc.id,
            visible: true
          });
      });
    });
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
  border-radius: 5px;
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

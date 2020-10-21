<template>
  <div class="home">

    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
      <!-- <p>{{allTrees[0].userID}}</p> -->
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

    <!-- USER LOCATION -->
    <div v-if="allTrees.length > 0">
      <GmapMarker
        :position= myCoordinates 
        :clickable="true"
        :draggable="false"   
        @click="center-myCoordinates"
      />
    </div>


      <GmapMarker
        v-for="(tree, index) in userTrees" 
        :key="tree.coords"
        :icon="{ url: require('../assets/customTreeSmall.png')}" 
        :position="tree.coordinates"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(tree, index)">
      </GmapMarker>

     <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>


      <!-- Light Tree / myTrees Icon -->

      <div v-if="allTrees.length > 0">
          <GmapMarker
            v-for="(tree, index) in myTrees" 
            :key="index"
            :icon="{ url: require('../assets/customTreeMyTreeSmall.png')}" 
            :position="tree.coordinates"
            :clickable="true"
            :draggable="true"
            @click="toggleInfoWindow(tree, index)">
        </GmapMarker>

        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false"
        >
          <div v-html="infoContent"></div>
      </gmap-info-window>
       </div>
      </GmapMap>

    </div>
    

  </div>
</template>

<script>
import { mapStyle } from "../constants/mapStyle.js";
import db from "@/main.js";
import firebase from 'firebase/app';
import "firebase/auth";

const allTreesMarker = require("../assets/customTreeSmall.png");
const myTreesMarker = require("../assets/customTreeMyTreeSmall.png");

export default {
  name: "Home",
  props: ["handleFormSubmit" ],
  components: {},

  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => (this.map = map));
    console.log("HOME current user", this.currentUserID);
    console.log("firebase", firebase);
  },

  data() {
    return {
      center: {lat: 52.511950, lng: 6.089625},
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
    
      markerOptions: {
        url: allTreesMarker,
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

    openWindow() {
      this.window_open = true;
    },
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

    toggleInfoWindow(tree, index) {
      this.infoWindowPos = tree.coordinates;
      this.infoContent = this.getInfoWindowContent(tree);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == index) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = index;
      }
    },

    getInfoWindowContent: function(marker) {
      return `<div class="windowCard">
        <div class="windowTop">
          <h6 class="windowTopText">${marker.treeType}</h6>
        </div>
        <div class="windowBottom">
          <h6 class="windowBottomText">${marker.description}</h6>
        </div>
      </div>`;
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition(position => {
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
    }),
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
    currentUserID() {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.uid
      } else {
        return null
      }
    },

    userTrees() {
      return this.allTrees.filter(tree => tree.userID !== firebase.auth().currentUser.uid)
    },
      myTrees() {
          return this.allTrees.filter(tree => tree.userID === firebase.auth().currentUser.uid)
      },

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

.windowCard {
  border: 1px solid $primary;
  border-radius: 5px;
  width: 180px;
  min-height: 90px;
  max-height: 120px;
  padding: 0;
}

.windowTop {
background-color: $primary;
}

.windowTopText {
  padding: 2px;
  font-size: .9rem;
}

.windowBottomText {
  padding: 0;
  font-size: .7rem;
  color: $primary;
}

.windowBottom {

}
</style>

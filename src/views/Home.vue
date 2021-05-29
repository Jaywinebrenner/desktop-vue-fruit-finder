<template>
  <div class="home">
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

    <!-- RENDER USER LOCATION -->
    <div v-if="allTrees.length > 0">
      <GmapMarker
        :position= myCoordinates 
        :clickable="true"
        :draggable="false"   
        @click="center-myCoordinates"
      />
    </div>

  <!-- RENDER ALL TREES IF NO ONE IS SIGNED IN -->
  <div v-if="!currentUserID">
      <GmapMarker
        v-for="(tree, index) in orderedTrees" 
        :key="tree.coords"
        :icon="{ url: require('../assets/customTreeSmall.png')}" 
        :position="tree.coordinates"
        :clickable="true"
        :draggable="false"
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
      
      <!-- RENDER USER SUBMITTED TREES -->
      <GmapMarker
        v-for="(tree, index) in userTrees" 
        :key="tree.coords"
        :icon="{ url: require('../assets/customTreeSmall.png')}" 
        :position="tree.coordinates"
        :clickable="true"
        :draggable="false"
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

      <!-- RENDER MY TREES -->
      <div v-if="allTrees.length > 0">
          <GmapMarker
            v-for="(tree, index) in myTrees" 
            :key="index"
            :icon="{ url: require('../assets/customTreeMyTreeSmall.png')}" 
            :position="tree.coordinates"
            :clickable="true"
            :draggable="true"
            @dragend="getDraggedMarkerPosition($event, tree)"
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
import {db} from "@/main.js";
// import firebase from 'firebase/app';
import "firebase/auth";
import axios from 'axios';

const allTreesMarker = require("../assets/customTreeSmall.png");
const myTreesMarker = require("../assets/customTreeMyTreeSmall.png");
// const customTreesMarker = require("../assets/customTreeVerifiedSmall.png");

export default {
  name: "Home",
  props: {
    handleFormSubmit: Function,
    allTrees: Array,
    currentUserID: String,
    currentUser: Object,
    myCoordinates: Object,
    orderedTrees: Array,
    userTrees: Array,
    myTrees: Array
  },
  components: {},

  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => (this.map = map));
  },

  data() {
    return {
      isTrue: true,
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
      // allTrees: [],
      isLoggedIn: false,
      styles: mapStyle,
      map: null,
      
      // myCoordinates: {
      //   lat: 0,
      //   lng: 0
      // },
      // postDragCoords: {},
      treeIcon: null

    };
  },

  methods: {
     async getDraggedMarkerPosition(event, tree) {
        let postDragCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

      // GET ADDRESS FROM COORDS
           
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.latLng.lat()},${event.latLng.lng()}&key=${process.env.VUE_APP_GEOCODE_KEY}`)
      .then((res) => {
        let updatedAddress = res.data.results[0].formatted_address
        console.log("New Address", updatedAddress)
        var newFormattedAddress = db.collection("locations").doc(tree.id);
        return newFormattedAddress.update({
          formattedAddress: updatedAddress,
          street: updatedAddress
        })
      })
        var newDragCoordsRef = db.collection("locations").doc(tree.id);
        return newDragCoordsRef.update({
          coordinates: postDragCoords
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    },
    // treeIcon() {
    //   if (tree.userID === this.currentUserID) {
    //     return allTreesMarker
    //   }
    //   if (tree.userID !== this.currentUserID) {
    //     return 
    //   }
    // },
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
      console.log("marker",marker)
      return `<div class="windowCard">
        <div class="windowTop">
          <h6 class="windowTopText">${marker.treeType}</h6>
        </div>
        <div class="contributorDiv">
           <p class="contributorText"><strong>Contributed by: </strong> ${marker.contributorName}</p>
        </div>
      
        <div class="windowBottom">
          <h6 class="windowBottomText">${marker.description}</h6>
        </div>
      </div>`;
    }
  },
  created() {
    
  },
 
  computed: {
    // userTrees() {
    //   return this.orderedTrees.filter(tree => tree.userID !== this.currentUserID)
    // },
    // myTrees() {
    //     return this.orderedTrees.filter(tree => tree.userID === this.currentUserID)
    // },

    // treeIcon() {
    //   this.allTrees && this.allTrees.forEach((tree) => {
    //     if(tree.userID === this.currentUserID) {
    //       return "My Tree"
    //     }
    //     if(tree.userID !== this.currentUserID) {
    //       return "User Tree"
    //     }
    //   })
    // },

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
  // height: 30px;
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
  // line-height: .9;
  margin-bottom: 0px;
}

.windowBottomText {
  padding: 0;
  font-size: .7rem;
  color: $primary;
}

.windowBottom {

}

.contributorText {
  font-size: 10px;
  color: black;
  margin-bottom: 0;
  line-height: 1.5;
}

</style>

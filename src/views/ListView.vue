<template>
  <div class="listViewWrapper">
    <div class="treeCardWrapper" v-for="tree in allTrees" :key="tree.id">
      <div class="treeCardTop__wrapper">
        <div class="treeCardTop__logoWrapper">
          <img
            class="treeCardTop__logo"
            alt="Vue logo"
            src="../assets/newLogoWhite.png"
          />
        </div>

        <div class="treeCardTop__typeTextWrapper">
          <h6 class="treeCardTop__typeText">{{ tree.treeType }}</h6>
          <h6 class="treeCardTop__distanceText">{{ calculateDistanceFromTree(tree.coordinates.lat, tree.coordinates.lng)}}</h6>
        </div>

        <div class="treeCardTop__buttonWrapper">
          <!-- <div
            class="treeTopCard__deleteButton"
            v-if="tree.userID === currentUserID"
            @click="areYouSure(tree.id)"
          >
            <p class="treeTopCard__deleteButtonText">Delete</p>
          </div>  -->

          <div
            class="treeTopCard__detailsButton"
            @click="tree.visible = !tree.visible"
          >
            <p class="treeTopCard__detailsButtonText">Details</p>
          </div>

          <div 
          class="deleteXWrapper"
          v-if="tree.userID === currentUserID"
          @click="areYouSure(tree.id)">
            <font-awesome-icon id="deleteX" icon="times" size="lg"/>
          </div>

          <div class="emptyDiv" v-if="tree.userID !== currentUserID"></div>

        </div>
      </div>

      <div v-show="!tree.visible" class="treeCardBottom__Wrapper">
        <div>
          <h6 class="treeCardBottom__typeText">{{ tree.formattedAddress }}</h6>
          <h6 class="treeCardBottom__distanceText">
            {{ tree.description }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/main.js";
import {  convertDistance } from 'geolib';
import getDistance from 'geolib/es/getPreciseDistance';
// import firebase from "firebase/app";
// import "firebase/auth";

export default {
  name: "ListView",
  props: {
    allTrees: Array,
    currentUserID: String,
    myCoordinates: Object
  },
  data() {
    return {
      isBottomOpen: false,
    };
  },
  mounted() {
  },

  methods: {
    areYouSure(treeIDInput) {
      this.$fire({
        title: "Warning",
        text: "Are you sure you want to delete this tree?",
        type: "warning",
        timer: 3000
      }).then(r => {
            console.log(r);
            db.collection("locations").doc(treeIDInput).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
      });
    },
    calculateDistanceFromTree(treeLat, treeLng) {
        let distance = getDistance( 
          { latitude: treeLat, longitude: treeLng },
          { latitude: this.myCoordinates.lat, longitude: this.myCoordinates.lng },
        )
        let distanceInMilesOrYards = this.milesOrYards(distance)
        // console.log("tree dis", distance)
        return distanceInMilesOrYards;
    },
    milesOrYards(distance) {
      if (distance < 1609.34) {
        let dist = Math.round(convertDistance(distance, "yd"));
        if (dist === 1) {
          return (dist + " yard away");
        } else {
          return(dist + " yards away");
        }
      } else {
        let dist = Math.round(convertDistance(distance, "mi"));
        if (dist === 1) {
          return (dist + " mile away");
        } else { 
          return(dist + " miles away");
        }
      }
    },
  },

  created() {
    this.allTrees && console.log("allTrees on List View", this.allTrees);
  }
};
</script>

<style lang='scss'>
@import "../styles/style.scss";

.listViewWrapper {
  background-color: $primary;
  display: flex;
  flex-flow: column;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
}

.treeCardWrapper {
  width: 90%;
  border: 1px solid white;
  margin: 7px 0;
  border-radius: 5px;
}

.treeCardTop__wrapper {
  display: flex;
  border: 1px solid white;
  align-items: center;
}

.treeCardBottom__Wrapper {
  background-color: white;
  padding: 10px;
}

.treeCardTop__logoWrapper {
  border-right: 1px solid white;
  padding-right: 5px;
}

.treeCardTop__typeTextWrapper {
  margin-left: 1rem;
}

.treeCardTop__typeText {
  text-align: left;
}
.treeCardTop__distanceText {
  font-weight: 130;
  text-align: left;
  line-height: 8px;
}

.treeCardTop__logo {
  width: 80px;
}

.treeCardTop__buttonWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 1rem;
  color: white;
  border-radius: 5px;
}

.treeTopCard__detailsButton {
  cursor: pointer;
  padding: 5px;
  border: 1px solid white;
  border-radius: 5px;
}

.treeTopCard__deleteButton {
  cursor: pointer;
  margin-right: 1vh;
  border: 1px solid white;
  border-radius: 5px;
  background-color: white;
}

.treeTopCard__deleteButtonText {
  color: $primary;
}

.treeCardBottom__typeText {
  color: $primary;
  text-align: left;
  font-weight: 230;
}
.treeCardBottom__distanceText {
  color: $primary;
  text-align: left;
}

.deleteXWrapper{
  position: relative;
 height: 55px;
 width: 5px;
 margin-left: 5px;
}

.deleteX {
  position: absolute;
  display: inline-block;
  color: #ffffff;
  cursor: pointer;
  width: 30px;
}

.emptyDiv {
  width: 10px;
}

// :style="{backgroundImage:'url(~@/assets/maroonGradient.png)'}"
</style>
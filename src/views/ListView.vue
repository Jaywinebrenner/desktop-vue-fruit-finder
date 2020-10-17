<template>
<div class="listViewWrapper">
  <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
    </div>
      <div class="mapListButtonWrapper">
       <router-link class="viewButton" to="/"><button class="mapListButton">Map View</button></router-link>
       <router-link class="viewButton" to="/listview"><button class="mapListButton">List View</button></router-link>
    </div>

    <div class="treeCardWrapper" v-for="tree in trees" :key="tree.id">
        <div class="treeCardTop__wrapper">

          <div class="treeCardTop__logoWrapper">
            <img class='treeCardTop__logo' alt="Vue logo" src="../assets/newLogoWhite.png">
          </div>

          <div class="treeCardTop__typeTextWrapper">
            <h6 class="treeCardTop__typeText">{{ tree.type}}</h6>
            <h6 class="treeCardTop__distanceText">30 yards away</h6>
          </div>

          <div class="treeCardTop__buttonWrapper">
            <div class="treeCardTop__button">Details</div>
          </div>
          
       </div>
     </div>

</div>
</template>

<script>
import {TREES} from '@/constants/FakeMarkers.js'
export default {
  data() {
    return {
      trees: TREES.markers
    }
  },
  mounted() {
    console.log("markers", TREES.markers)
    this.trees = TREES.markers
    console.log("this trees", this.trees);
  }

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

.treeCardWrapper {
  // display: flex;
  // flex-direction: column;
  width: 90%;
  border: 1px solid white;
  // justify-content: center;
  margin-top: 15px;
  border-radius: 5px;
}

.treeCardTop__wrapper {
  display: flex;
  // justify-content: flex-start;
  align-items: center;
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
  margin-left: auto;
  margin-right: 1rem;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
}

.treeCardTop__button {
  padding: 5px;

}

</style>
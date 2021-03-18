<template>
<div class="subheaderWrapper">
    <div v-if="whichView === 'Map'">
        <h5 class="browseText">Browse the Map for Fruit Trees Near You</h5>
    </div>
    <div v-if="whichView === 'List'">
        <h5 class="browseText">Peruse the list for Fruit Trees Near You</h5>
    </div>
    <div v-if="whichView === 'Map' || whichView === 'List'" id="mapListButtonWrapper">
        <div id="mapListButton"  
        :style="{
            backgroundColor: (isActive ? '#ccc' : '#ffffff'), 
            color: 'black', 
            }" @click="toggleMapAndListButton('showMap')">Map View</div>
        <div id="mapListButton" 
            :style="{
                backgroundColor: (isActive ? '#ffffff' : '#ccc'), 
                color: 'black', 
                }" 
            @click="toggleMapAndListButton('showList')">List View</div> 
        </div>
    </div>
</template>

<script>


export default {
    name: "Subheader",
    props: {
        isActive: Boolean,
        toggleMapAndListButton: Function,
        whichView: String
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

.subheaderWrapper {
  display: flex;
  flex-direction: column;
  background-color: $primary;
  padding: 5px 10px 0px 10px;

}


#mapListButtonWrapper {
    // overflow: hidden;
  padding: 0px;  
//   border: 1px solid #ccc;
  background-color: #f1f1f1;
  margin: 0 auto 8px auto;
}
#mapListButton {
  background-color: #ffffff;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  padding: 7px;
  font-size: 13px;
  margin: 0px;
  text-align: center;
  border-radius: 0;
}

.browseText {
    font-size: 2.4rem;
}

#mapListButton:hover {
  background-color: red;
}

@media screen and (max-width: 600px) {
  .browseText {
    font-size: 1.8rem;
  }
}

</style>

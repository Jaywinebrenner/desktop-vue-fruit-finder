<template>
  <div class="subheaderWrapper">    
    <div v-if="this.$parent.whichView === 'Map'">
        <h5 class="browseText">Browse the Map for Fruit Trees Near You</h5>
    </div>
    <div v-if="this.$parent.whichView === 'List'">
        <h5 class="browseText">Peruse the list for Fruit Trees Near You</h5>
    </div>
    <div id="mapListFilterWrapper" v-if="this.$parent.whichView === 'Map' || this.$parent.whichView === 'List'" >
      <div class="mapListButtonsWrapper">
        <div class="mapListButton"  
        :style="{
            backgroundColor: (isActive ? '#ccc' : '#ffffff'), 
            color: 'black', 
            }" @click="toggleMapAndListButton('showMap')">Map View
        </div>
        <div class="mapListButton" 
            :style="{
                backgroundColor: (isActive ? '#ffffff' : '#ccc'), 
                color: 'black', 
                }" 
            @click="toggleMapAndListButton('showList')">List View
        </div> 
      </div>
      <div class="dropdownWrapper">
        <b-dropdown :text="buttonTitle" id="dropdown-2" class="m-md-2">
          <!-- <b-dropdown-item active>All Trees</b-dropdown-item> -->
          <b-dropdown-item v-for="option in treeDropdownOptions" 
                :key="option.text" 
                :value="option.text"
                @click="selectFilter(option.text)">
            {{option.text}}
          </b-dropdown-item>  
        </b-dropdown>
      </div>
  </div>
      </div>

</template>

<script>

import treeDropdownOptions from '../constants/treeDropdownOptions.js'

export default {
    name: "Subheader",
    props: {
        isActive: Boolean,
        toggleMapAndListButton: Function,
        // whichView: String,
        filteredTrees: Array,
        selectFilter: Function,
        buttonTitle: String
        // selectedFilter: String
    },
    data() {
        return {
          treeDropdownOptions: treeDropdownOptions,
          // selectedFilter: null

        }
    },
methods: {
  // selectFilter(filterType) {
  //   this.$parent.selectedFilter = filterType
  //   }
  }
}

</script>

<style lang="scss">
@import "../styles/style.scss";

.subheaderWrapper {
  // display: flex;
  // flex-direction: column;
  background-color: $primary;
  padding: 5px 10px 0px 10px;
  margin: 0 auto;
  text-align: center;

}


#mapListFilterWrapper {
    // overflow: hidden;
  padding: 0px;  
//   border: 1px solid #ccc;
  background-color: #f1f1f1;
  background-color: $primary;
  // margin: 0 auto 8px auto;
  display: inline-block;
}

.mapListButtonsWrapper {
  display: inline-block;
      margin-left: 220px
}

.mapListButton {
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
  margin-right: 10px;
}

#mapListButtons:hover{
  // filter: drop-shadow(30px 10px 4px #4444dd);
  color: pink;
}

.dropdownWrapper {
  display: inline-block;
}

.browseText {
    font-size: 2.4rem;
}

.dropdown-menu {
  z-index: 0;
}


@media screen and (max-width: 600px) {
  #mapListFilterWrapper {
    margin: 0 auto 12px auto;
  }
  .browseText {
    font-size: 1.8rem;
  }
  .mapListButtonsWrapper {
    display: block;
    margin: 0 auto;
  }
  #dropdown-2 {

    margin: 10px 7px 0px 0px;
  }
  #dropdown-2__BV_toggle_{
    margin-bottom: 0px !important;
  }
  .dropdown-menu {
    left: -40px !important;
  }
  .welcomeText {
    padding: 0;
    cursor: none;
  }
  .splashLogo {
    width: 100px;
  }
  .deleteXWrapper {
    height: 44px !important;
  }
  .browseText {
    font-size: 1.6rem;
  }
}

#dropdown-2__BV_toggle_{
  @include maroonButton;
   padding: 4px 10px;
   width: 190px;
   margin: 0 0 27px 0;
   
 }


</style>

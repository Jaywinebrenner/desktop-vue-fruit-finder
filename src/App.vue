<template>
  <div id="appWrapper">
    <Navbar
			:showView="showView"
      :isLoggedIn="isLoggedIn"
      :showAddTreeModal="showAddTreeModal"
      :hideAddTreeModal="hideAddTreeModal"
      :formData="formData"
      :getCurrentUser="getCurrentUser"
      :getCurrentUserID="getCurrentUserID"
    />

    <Subheader
      :toggleMapAndListButton="toggleMapAndListButton"
      :isActive="isActive"
      :whichView="whichView"
      :selectFilter="selectFilter"
    />

		<Home
			v-if="whichView === 'Map'"
      :allTrees="allTrees"
      :currentUser="currentUser"
      :currentUserID="currentUserID"
      :myCoordinates="myCoordinates"
      :orderedTrees="orderedTrees"
		/>
		<ListView
			v-if="whichView === 'List'"
      :allTrees="allTrees"
      :currentUserID="currentUserID"
      :myCoordinates="myCoordinates"
      :orderedTrees="orderedTrees"
		/>

		<About 
			v-if="whichView === 'About'"
		/>

		<Login
			v-if="whichView === 'Login'"
      :showView="showView"
      :getCurrentUser="getCurrentUser"
		/>

		<SignUp
			v-if="whichView === 'SignUp'"
      :showView="showView"
		/>

    <modal class="modalWrapper" name="addTreeModal" :width="'90%'" :height="'75%'">
      <div class="xIconWrapper">
         <font-awesome-icon @click="hideAddTreeModal()" class="xIcon" icon="times" size="lg"/>
      </div>
 
      <h5 class="modalHeader">{{ formData.treeType ? formData.treeType  : "Enter Tree Information" }}</h5>

      <div class="formWrapper container mt-6">
        <b-form class="formWrapper" @submit.prevent="handleFormSubmit">
          <!-- <b-row>
            <b-form-group>
              <b-form-input
                id="treeTypeInput"
                placeholder="Type of Tree"
                class="input"
                v-model="formData.treeType"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-row> -->

        <div>
          <b-dropdown id="dropdown-1" v-model="formData.treeType" text="Select Tree Type" class="m-md-2">
            <b-dropdown-item disabled value="0">{{ formData.treeType ? "Select a tree type" : formData.treeType }}</b-dropdown-item>
            <b-dropdown-item v-for="option in dropdown.treeDropdownOptions" 
                  :key="option.text" 
                  :value="option.text"
                  @click="formData.treeType = option.text">
              {{option.text}}
            </b-dropdown-item>  
          </b-dropdown>
        </div>

          <b-row md="1">
            <b-form-group>
              <b-form-textarea
                id="textArea"
                size="sm"
                v-model="formData.description"
                placeholder="Description"
                rows="5"
                max-rows="4"
              ></b-form-textarea>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="streetInput"
                placeholder="Address or Cross Street"
                class="input"
                v-model="formData.street"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row class="buttonRow" md="1">
						
            <button type="submit" id="submitTreeButton">
              <b-spinner small v-if="spinLoading" label="Spinning"></b-spinner
              ><span v-if="!spinLoading">Submit Tree</span>
            </button>

          </b-row>
        </b-form>
      </div>
    </modal>
  
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Subheader from "./components/Subheader";
import Home from "./views/Home";
import ListView from "./views/ListView";
import About from "./views/About";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import db from "./main.js";
import axios from 'axios';
import firebase from 'firebase/app';
import "firebase/auth";
import getDistance from 'geolib/es/getPreciseDistance';
import treeDropdownOptions from './constants/treeDropdownOptions.js'


export default {
	name:"App",
	components: {
		Home, 
		Navbar,
		ListView,
		About,
		Login,
		SignUp,
    Subheader
	},

data() {
    return {
      allTrees: [],
      orderedTrees: [],
      selectedFilter: null,
      currentUser: null,
      currentUserID: null,
			whichView: "Map",
			isMapViewVisible: true,
      API_KEY: process.env.API_KEY_GEOCODE,
      spinLoading: false,
      savedLocations: [],
      isLoggedIn: null,
      isActive: true,
      dropdown: {
        visible: true,
        treeDropdownOptions: treeDropdownOptions,
        selectedTreeOption: null,

      },
      formData: {
        treeType: "",
        description: "",
        address: {
          street: "",
          city: "",
          state: "",
          zip: ""
        },
        coordinates: {
          lat: "",
          lng: ""
        }
      },
      myCoordinates: {
        lat: 0,
        lng: 0
      },
    };
  },
  mounted() {
		this.getCurrentUser()
  },

  methods: {
    async getCurrentUser() {
      this.currentUser = await firebase.auth().currentUser;
    },
    async getCurrentUserID() {
      if (firebase.auth().currentUser) {
        this.currentUserID = await firebase.auth().currentUser.uid;
      } else {
        this.currentUserID = null;
      }
    },
    toggleMapAndListButton(view) {
      if (view === 'showMap') {
        this.isActive = true
        this.showView('Map');
      } else {
        this.isActive = false
        this.showView('List');
      }


    },
    // makeToast(append = false) {
    //     this.$bvToast.toast("You have successfully uploaded your tree.", {
    //       title: 'Well done, friend!',
    //       autoHideDelay: 3000,
    //       appendToast: append
    //     })
    //   },

   
    showAddTreeModal() {
      this.$modal.show("addTreeModal");
    },
    hideAddTreeModal() {
      this.$modal.hide("addTreeModal");
      this.formData.treeType = null;
      this.formData.description = null;
      this.formData.street = null;
    },
		showView(view){
			this.whichView = view;
			console.log("Which View? ", this.whichView)
		},
    
    async handleFormSubmit() {
      this.spinLoading = true;
      if (
        !this.formData.treeType ||
        !this.formData.description ||
        !this.formData.street 
      ) {
        this.$toastr.e(
              "You didn't fill out the form properly. Give it another shot!"
            );
        this.spinLoading = false;
        return;
      }
      let coordObject = {
        lat: '',
        lng: ''
      }
      const addressObject = {
          street: this.formData.street,
        };
      let formattedAddress = '';
      await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params:{
          address: addressObject,
          key: process.env.VUE_APP_GEOCODE_KEY
        }
      })
      .then((response)=> {
        if (response !== "undefined") {
          coordObject = response.data.results[0].geometry.location;
          formattedAddress = response.data.results[0].formatted_address;
        } else {
          this.$toastr.e(
              "Sorry, the address or cross street you entered was wonky... Give it another shot!"
            );
          return;
        }
      })
      .catch((error)=> {
        this.$toastr.e(
              error
            );
        return;
      });
      
      let submittedTreeData = {
        userID: firebase.auth().currentUser.uid,
        treeType: this.formData.treeType,
        description: this.formData.description,
        address: addressObject,
        formattedAddress: formattedAddress,
        coordinates: coordObject,
        contributorName: this.currentUser.displayName
      }

      await db
        .collection("locations")
        .add(submittedTreeData)
        .then(() => {
          console.log("upload successful!");
        });

      // Clean up 
      this.formData.treeType = "";
      this.formData.description = "";
      this.formData.street = "";
      this.hideAddTreeModal();
      this.spinLoading = false;
      // this.makeToast();
      this.$toastr.s(
          "You have successfully uploaded your tree!"
        );
    },

    selectFilter(filterType) {
      this.selectedFilter = filterType;
      this.orderAndFilteredTrees(filterType)
    },

    orderTrees() {
      this.allTrees.forEach((tree) => {
        console.log(tree)
        let distance = getDistance(
        { latitude: tree.coordinates.lat, longitude: tree.coordinates.lng },
        { latitude: this.myCoordinates.lat, longitude: this.myCoordinates.lng },
        );
        tree.distance = distance;
      });
      this.orderedTrees = this.allTrees.sort((a, b) =>
      a.distance > b.distance ? 1 : -1,)
    },

    orderAndFilteredTrees(filterType) {
      this.orderTrees();
       let orderedAndFilteredTrees = [];
        if (!filterType) {
          return;
        }
        if(filterType === "All Trees") {
          console.log("HERE")
          return this.orderTrees();
        }
        this.orderedTrees.forEach((tree) => {
          if(filterType === tree.treeType) {
            orderedAndFilteredTrees.push(tree);
          }
          this.orderedTrees = orderedAndFilteredTrees;
        console.log("OAFTrees", orderedAndFilteredTrees)
      })
    }  

  },
  computed: {
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.isLoggedIn = true;
          this.getCurrentUser()
          this.getCurrentUserID()
          console.log("Are you logged in?", this.isLoggedIn)
        } else {
          this.isLoggedIn = false;
          this.getCurrentUser()
          this.getCurrentUserID()
          console.log("Are you logged in?", this.isLoggedIn)
        }
    })      
      
    db.collection("locations").onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
          let newTrees = [];
          if (change.type === "added") {
              const changedData = change.doc.data();
              // console.log("Added: ", change.doc.data());
              newTrees.push(changedData);

              this.allTrees.push({
                ...change.doc.data(),
                id: change.doc.id, 
                visible: true
              });
            }
            if (change.type === "modified") {
              console.log("Modified: ", change.doc.data());
            }
            if (change.type === "removed") {
              // Find index of removed tree and remove it from UI
              var removeIndex = this.allTrees.map(function(item) { return item.id; }).indexOf(change.doc.id);
              this.allTrees.splice(removeIndex, 1);
              console.log("allTrees DELETE", this.allTrees);
              console.log("Removed: ", change.doc.data());
            }

            this.orderTrees()
        

        });
      });

      navigator.geolocation.getCurrentPosition(position => {
        this.myCoordinates.lat = position.coords.latitude;
        this.myCoordinates.lng = position.coords.longitude;
      })
  },
};
</script>

<style lang="scss">
@import "./styles/style.scss";

html,
body {
  height: 100%;
  background-color: $primary;
}

#appWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $primary;
}

#appPage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.modalHeader {
  margin: 20px 0;
  color: $primary;
}



.formWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.formWrapper > input {
  background-color: rgb(244, 240, 240);
  border-radius: 5px;
  margin: 5px;
}

#submitTreeButton {
  margin-left: 20px;
  width: 200px;
  @include maroonButton;
}

.dropdown {

} 
//  #dropdown-1 {
//    @include maroonButton;
//    padding: 3px 10px;
//    width: 290px;
//    margin: 0 0 15px 0;
//  }

 #dropdown-1__BV_toggle_{
      @include maroonButton;
   padding: 3px 10px;
   width: 290px;
   margin: 0 0 15px 0;
 }

 .dropdown-menu {
   height: auto;
   max-height: 200px;
   overflow-x: hidden;
   width: 290px;
 }

#textArea {
  width: 290px;
  max-height: 200px;
}

.row {
  margin: 0;
  padding: 0;
}

.input {
  margin: 0;
  max-height: 27px;
}

#treeTypeInput,
#streetInput,
#cityInput,
#stateInput,
#zipInput {
  width: 290px;
}

#streetInput{
  margin-bottom: 4vh;
}

.col-form-label {
  margin: 0;
  padding: 0;
}

.buttonRow {
  margin: 0;
}

.textAreaInput {
  background-color: rgb(244, 240, 240);
  width: 290px;
  height: 90px;
  max-height: 100px;
  margin: 4px 0;
  border: 2px black solid;
  border-radius: 5px;
}

.xIcon {
  display: inline-block;
  color: $primary;
  cursor: pointer;
  width: 30px;
}

// .treeIcon {
//   color: $hover;
//   padding: 20px;
// }

.xIconWrapper {
  padding: 10px;
}

.treeTypeDisplay {
  color: $primary;
}



</style>

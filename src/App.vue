<template>
  <div id="appWrapper">
		<button style="background-color: white;" @click="getCurrentUserButton()">Get Current User</button>
    <Navbar
			:showAboutView="showAboutView"
			:showMapView="showMapView"
      :showAddTreeModal="showAddTreeModal"
      :hideAddTreeModal="hideAddTreeModal"
      :formData="formData"
    />
    <!-- <div class="appPage">
      <router-view 
      :handleFormSubmit="handleFormSubmit"
      :userID="userID"
      />
    </div> -->

		<!-- SUBHEADER -->
		<div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
      <!-- <p>{{allTrees[0].userID}}</p> -->
    </div>
    <div class="mapListButtonWrapper">
       <button class="mapListButton" @click="showMapView()">Map View</button>
       <button class="mapListButton" @click="showListView()">List View</button> 
    </div>
		<!-- END SUBHEADER -->

		<Home
			v-if="whichView === 'Map'"
		/>
		<ListView
			v-if="whichView === 'List'"
		/>

		<About 
			v-if="whichView === 'About'"
		/>

    <modal name="addTreeModal" :width="'90%'" :height="'75%'">
      <h5 class="modalHeader">Enter Tree Information</h5>

      <div class="formWrapper container mt-6">
        <b-form class="formWrapper" @submit.prevent="handleFormSubmit">
          <b-row>
            <b-form-group>
              <b-form-input
                id="treeTypeInput"
                placeholder="Type of Tree"
                class="input"
                v-model="formData.treeType"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-row>

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
import Home from "./views/Home";
import ListView from "./views/ListView";
import About from "./views/About";
import db from "./main.js";
import axios from 'axios';
import firebase from 'firebase/app';
import "firebase/auth";
// import API_KEY from '@/geocoder.js'

export default {
	name:"App",
	components: {
		Home, 
		Navbar,
		ListView,
		About
	},
  
data() {
    return {
			whichView: "Map",
			isMapViewVisible: true,
      API_KEY: process.env.API_KEY_GEOCODE,
      spinLoading: false,
      savedLocations: [],
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
      }
    };
  },
  mounted() {
		this.getCurrentUser()
  },

  computed: {
    userID() {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.uid
      } else {
        return "No User ID Available"
      }
    }
  },

  methods: {
    async getCurrentUser() {
      let id = null
      id = await firebase.auth().currentUser.uid
      console.log("currentUserID", id);
    },
		getCurrentUserButton() {
			console.log("CURRENT USER: ", firebase.auth().currentUser)
		},
    makeToast(append = false) {
        this.$bvToast.toast("You have successfully uploaded your tree.", {
          title: 'Well done, friend!',
          autoHideDelay: 3000,
          appendToast: append
        })
      },
   
    showAddTreeModal() {
      this.$modal.show("addTreeModal");
    },
    hideAddTreeModal() {
      this.$modal.hide("addTreeModal");
      this.treeType = "";
      this.description = "";
      this.street = "";
    },
		// toggleMapAndList() {
		// 	console.log("isMapViewVisible?", this.isMapViewVisible)
		// 	this.isMapViewVisible = !this.isMapViewVisible
		// },
		showMapView() {
			this.whichView = 'Map'
			console.log("which View??", this.whichView)
		},
		showListView() {
			this.whichView = 'List'
			console.log("which View??", this.whichView)
		},
		showAboutView() {
			this.whichView = 'About'
			console.log("which View??", this.whichView)
		},
    async handleFormSubmit() {
      this.spinLoading = true;
      if (
        !this.formData.treeType ||
        !this.formData.description ||
        !this.formData.street 
      ) {
        alert("You didn't fill out the form properly. Give it another shot!");
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
          alert("Sorry. The address you entered was wonky. Please try again.")
          return;
        }
      })
      .catch((error)=> {
        alert(error)
        return;
      });
      
  
      let submittedTreeData = {
        userID: firebase.auth().currentUser.uid,
        treeType: this.formData.treeType,
        description: this.formData.description,
        address: addressObject,
        formattedAddress: formattedAddress,
        coordinates: coordObject
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
      this.makeToast();
    },

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
  // display: flex;
  // height: 100%;
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
  background-color: red;
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

.mapListButtonWrapper {
  padding: 10px;
	margin: 0 auto;
}

</style>

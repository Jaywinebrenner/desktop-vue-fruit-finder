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
		<!-- SUBHEADER -->
		<div v-if="whichView === 'Map'" class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees Near You</h5>
      <!-- <p>{{allTrees[0].userID}}</p> -->
    </div>
    <div v-if="whichView === 'List'" class="homeSubheader">
      <h5 class="homeText">Peruse the list for Fruit Trees Near You</h5>
    </div>
    <div v-if="whichView === 'Map' || whichView === 'List'" class="mapListButtonWrapper">
       <button class="mapListButton" @click="showView('Map')">Map View</button>
       <button class="mapListButton" @click="showView('List')">List View</button> 
    </div>
		<!-- END SUBHEADER -->

		<Home
			v-if="whichView === 'Map'"
      :allTrees="allTrees"
      :currentUser="currentUser"
      :currentUserID="currentUserID"
		/>
		<ListView
			v-if="whichView === 'List'"
      :allTrees="allTrees"
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
         <!-- <font-awesome-icon @click="hideAddTreeModal()" class="treeIcon" icon="tree" size="lg"/> -->
      </div>
 
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
import Login from "./views/Login";
import SignUp from "./views/SignUp";
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
		About,
		Login,
		SignUp
	},

data() {
    return {
      allTrees: [],
      currentUser: null,
      currentUserID: null,
			whichView: "Map",
			isMapViewVisible: true,
      API_KEY: process.env.API_KEY_GEOCODE,
      spinLoading: false,
      savedLocations: [],
      isLoggedIn: null,
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
      this.treeType = "";
      this.description = "";
      this.street = "";
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
      // this.makeToast();
      this.$toastr.s(
          "You have successfully uploaded your tree!"
        );
    },
    
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

</style>

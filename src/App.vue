<template>
  <div id="app">
    <Navbar
      :showAddTreeModal="showAddTreeModal"
      :hideAddTreeModal="hideAddTreeModal"
      :formData="formData"
    />

    <div class="appPage">
      <router-view :handleFormSubmit="handleFormSubmit" />
    </div>

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

          <!-- <b-row md="1">
            <b-form-group>
              <b-form-input
                placeholder="Description"
                class="input"
                v-model="formData.description"
              ></b-form-input>
            </b-form-group>
          </b-row> -->

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="streetInput"
                placeholder="Street"
                class="input"
                v-model="formData.street"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="cityInput"
                placeholder="City"
                class="input"
                v-model="formData.city"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="stateInput"
                placeholder="State"
                class="input"
                v-model="formData.state"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="zipInput"
                placeholder="Zip Code"
                class="input"
                v-model="formData.zip"
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
import db from "./main.js";

export default {
  data() {
    return {
      spinLoading: false,
      fart: "BIg ole fart",
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
        coordinates: ""
      }
    };
  },
  mount() {
    this.showAddTreeModal();
    console.log("DB", db);
  },
  methods: {
    makeToast(append = false) {
        this.$bvToast.toast("You have successfully uploaded your tree!", {
          title: 'Congrats and Thanks!',
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
      this.city = "";
      this.state = "";
      this.zip = "";
    },
    async handleFormSubmit() {
      this.spinLoading = true;
      if (
        !this.formData.treeType ||
        !this.formData.description ||
        !this.formData.street ||
        !this.formData.city ||
        !this.formData.state ||
        !this.formData.zip
      ) {
        alert("You didn't fill out the form properly. Give it another shot!");
        return;
      }

      let submittedTreeData = {
        treeType: this.formData.treeType,
        description: this.formData.description,
        address: {
          street: this.formData.street,
          city: this.formData.city,
          state: this.formData.state,
          zip: this.formData.zip
        },
        coordinates: ""
      };

      await db
        .collection("locations")
        .add(submittedTreeData)
        .then(() => {
          console.log("added????");
        });

      await console.log("address", submittedTreeData);
      // Clean up after function
      this.formData.treeType = "";
      this.formData.description = "";
      this.formData.street = "";
      this.formData.city = "";
      this.formData.state = "";
      this.formData.zip = "";
      this.hideAddTreeModal();
      this.spinLoading = false;
      this.makeToast();
    }
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "./styles/style.scss";

html,
body {
  height: 100%;
  background-color: $primary;
}

#app {
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
</style>

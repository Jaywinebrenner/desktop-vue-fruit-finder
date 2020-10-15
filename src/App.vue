<template>
  <div id="app">
    <Navbar
      :showAddTreeModal="showAddTreeModal"
      :hideAddTreeModal="hideAddTreeModal"
    />

    <div class="appPage">
      <router-view :handleFormSubmit="handleFormSubmit" />
    </div>

    <modal
      class="modalWrapper"
      name="addTreeModal"
      :width="'80%'"
      :height="'70%'"
    >
      <h5 class="modalHeader">Enter Tree Information</h5>

      <div class="formWrapper container mt-6">
        <b-form class="formWrapper" @submit.prevent="handleFormSubmit">
          <b-row>
            <b-form-group>
              <b-form-input
                placeholder="Type of Tree"
                class="input"
                v-model="treeType"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                placeholder="Description"
                class="input"
                v-model="description"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                placeholder="Street"
                class="input"
                v-model="street"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                placeholder="City"
                class="input"
                v-model="city"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                placeholder="State"
                class="input"
                v-model="state"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                placeholder="Zip Code"
                class="input"
                v-model="zip"
              ></b-form-input>
            </b-form-group>
          </b-row>
          <b-row class="buttonRow" md="1">
            <button type="submit" id="submitTreeButton">Submit Tree</button>
          </b-row>
        </b-form>
      </div>
    </modal>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { db } from "./main.js";
export default {
  async beforeMount() {
    const snap = await db.collection("locations").get();

    snap.docs.forEach(doc => {
      this.savedLocations.push(doc.data);
    });
  },
  mount() {
    this.showAddTreeModal();
  },
  methods: {
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
      
      const address = `${!this.formData.street}, ${!this.formData.city}, ${!this.formData.state}, ${!this.formData.zip}`
      await console.log("user input", this.formData);
    }
  },
  components: {
    Navbar
  },
  data() {
    return {
      fart: "BIg ole fart",
      savedLocations: [],
      formData: {
        treeType: "",
        description: "",
        street: "",
        city: "",
        state: "",
        zip: ""
      }
    };
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

.textArea {
  background-color: rgb(244, 240, 240);
  width: 290px;
  height: 90px;
  max-height: 100px;
  margin: 4px 0;
  border: 2px black solid;
  border-radius: 5px;
}

.row {
  margin: 0;
  padding: 0;
}

.input {
  margin: 0;
  max-height: 27px;
}

.col-form-label {
  margin: 0;
  padding: 0;
}

.buttonRow {
  margin: 0;
}
</style>

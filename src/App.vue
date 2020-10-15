<template>
  <div id="app">
      <Navbar
        :showAddTreeModal="showAddTreeModal"
        :hideAddTreeModal="hideAddTreeModal"
      />

    <div class="appPage">
      <router-view/>
      
    </div>

   <modal 
   class="modalWrapper" 
   name="addTreeModal"
   :width='"80%"'
   :height='"70%"'
   >
      <h5 class="modalHeader">Enter Tree Information</h5>

      <div class="formWrapper container mt-6">
        <b-form @submit.prevent="handleFormSubmit">
            <b-row> 
                  <b-form-group>
                    <b-form-input  placeholder="Type of Tree" class="input" v-model="treeType"></b-form-input>
                  </b-form-group>
              </b-row>

               <b-row md="1">
                <b-form-group>
                    <b-form-input placeholder="Description" class="input" v-model="description"></b-form-input>
                  </b-form-group>
              </b-row>

                <b-row md="1">
                <b-form-group >
                    <b-form-input placeholder="Street" class="input" v-model="street"></b-form-input>
                  </b-form-group>
              </b-row>

              <b-row md="1">
                <b-form-group>
                    <b-form-input placeholder="City" class="input" v-model="city"></b-form-input>
                  </b-form-group>
              </b-row>

              <b-row md="1">
                <b-form-group>
                    <b-form-input placeholder="State" class="input" v-model="state"></b-form-input>
                  </b-form-group>
              </b-row>

              <b-row md="1">
                <b-form-group>
                   <b-form-input placeholder="Zip Code" class="input" v-model="zip"></b-form-input>
                  </b-form-group>
              </b-row>
              <b-row md="1">
              <button type="submit" id="submitTreeButton">Submit Tree</button>

                </b-row>
          </b-form>


      </div>
     
      <!-- <form
      class="formWrapper"
          @submit="handleFormSubmit"
          method="post"
        >
        <input type="text" v-model="treeType" placeholder="Type of Tree">
        <textarea class="textArea" v-model="description" placeholder="Tree Description"></textarea>

        <input type="text" v-model="street" placeholder="Street">
        <input type="text" v-model="city" placeholder="City">
          <input type="text" v-model="state" placeholder="State">
        <input type="text" v-model="zip" placeholder="Zip Code">
      <button class="submitTreeButton">Submit Tree</button>

      <h1>DESC: {{description}}</h1>
      <h1>DESC: {{treeType}}</h1>

      </form> -->
  
    </modal>

  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  mount () {
      this.showAddTreeModal()
    },
  methods: {
     showAddTreeModal() {
          this.$modal.show('addTreeModal');
        },
      hideAddTreeModal() {
          this.$modal.hide('addTreeModal');
          this.treeType= ''
          this.description= ''
          this.street= ''
          this.city= ''
          this.state= ''
          this.zip= ''
      },
      async handleFormSubmit() {

      },
  },
  components: {
    Navbar
  },
  data() {
    return {
      allTrees: [],
      formData: {
        treeType: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: ''
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/style.scss';

html, body {
  height: 100%;
  background-color:$primary;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
   background-color:$primary;
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

.modalHeader{
  margin-top: 10px;
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

</style>

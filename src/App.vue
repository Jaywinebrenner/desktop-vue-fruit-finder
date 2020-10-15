<template>
  <div id="app">
      <Navbar
        :showAddTreeModal="showAddTreeModal"
        :hideAddTreeModal="hideAddTreeModal"
      />

    <div class="appPage">
      <router-view/>
    </div>

   <modal class="modalWrapper" name="addTreeModal">
        <h5 class="modalHeader">Enter Tree Location</h5>
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
      },
      async handleFormSubmit() {

      },
  },
  components: {
    Navbar
  },
  data() {
    return {
      savedLocations: [],
      formData: {
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
</style>

<template>
  <div id="app">
      <Navbar
        :show="show"
        :hide="hide"
      />

    <div class="appPage">
      <router-view/>
    </div>

   <modal class="modalWrapper" name="addTreeModal">
        This is my first modal
    </modal>

  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  mount () {
      this.show()
    },
  methods: {
     show() {
          this.$modal.show('addTreeModal');
        },
      hide() {
          this.$modal.hide('addTreeModal');
      },
  },
  components: {
    Navbar
  },
  data() {
    return {
      fart() {
        alert("FARRRRRT!")
      },
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
</style>

<template>
  <div id="app">
      <Navbar/>

    <div class="appPage">
      <router-view/>
    </div>


  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import './styles/style.scss';

html, body {
  height: 100%;
  background-color:blue;
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

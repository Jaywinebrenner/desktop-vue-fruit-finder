<template>
  <div class="home">

    <img class='splashLogo' alt="Vue logo" src="../assets/newLogo.png">

    <div class='one'>ONE</div>

 
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang='scss'>
@import '../styles/style.scss';

.one {
  background-color: $primary;
  color: $primary;
  @include flexCenter();
}

.two {
  background-color: $secondary;
  @include flexCenter();
}

.three {
  background-color: $thirdly;
  @include flexCenter();
}

.splashLogo {
  width: 260px;
}

</style>

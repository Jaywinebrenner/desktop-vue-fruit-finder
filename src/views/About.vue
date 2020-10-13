<template>
  <div class="aboutWrapper">

    <h3>Help Eliminate Needless Food Waste</h3>
    <h5>The Portland Fruit Tree Project Mobile App connects people to the plentiful fruit tree bounties in their very neighborhood</h5>
    <h3>Contribute to the Community</h3>
    <h5>If you see a tree in your neighborhood who’s fruit sadly goes unpicked, enter it in the Fruit Tree Finder. Simply sign in, add a tree and voila! You will have made a small yet powerful contribution to help those in want and reduce needless food waste.</h5>
  
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">

@import '../styles/style.scss';

.aboutWrapper > h3, h5 {
  color: white;
}



.aboutWrapper {
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: $primary;
  align-items: center;
  justify-content: center;
}


</style>
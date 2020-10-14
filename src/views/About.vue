<template>
  <div class="aboutWrapper">

    <h3 class="aboutTitle">Help Eliminate Needless Food Waste</h3>
    <h5 class="aboutSubtitle">The Fruit Finder connects people to the plentiful fruit tree bounties in their very neighborhood</h5>
    <h3 class="aboutTitle">Contribute to the Community</h3>
    <h5 class="aboutSubtitle">If you see a tree in your neighborhood who’s fruit sadly goes unpicked, enter it in the Fruit Tree Finder. Simply sign in, add a tree and voila! You will have made a small yet powerful contribution to help those in want and reduce needless food waste.</h5>
  
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
  text-align: center;
  line-height: 1.4rem;
}
.aboutWrapper > h3 {
font-size: 4vh;
margin-bottom: .5rem;
}

.aboutWrapper > h5 {
font-size: 2vh;
margin-bottom: 4vh;
}



.aboutWrapper {
  margin: 10px 10vh;
  display: flex;
  flex-direction: column;
  background-color: $primary;
  align-items: center;
  justify-content: center;
}


</style>
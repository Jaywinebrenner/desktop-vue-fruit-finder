<template>
  <div class="aboutWrapper">

    <h3 class="aboutTitle">Help Eliminate Needless Food Waste</h3>
    <h5 class="aboutSubtitle">The Fruit Finder connects people to the plentiful fruit tree bounties in their very neighborhood</h5>
    <h3 class="aboutTitle">Contribute to the Community</h3>
    <h5 class="aboutSubtitle">If you see a tree in your neighborhood who’s fruit sadly goes unpicked, enter it in the Fruit Tree Finder. Simply sign in, add a tree and voila! You will have made a small yet powerful contribution to help those in want and reduce needless food waste.</h5>
    <h3 class="aboutTitle">Frequently Asked Questions</h3>
    <h5><strong>I can only enter an address or cross street for my tree. Can I add a tree in an alley?</strong></h5>
    <p>Yes. You can add the closest address or cross street for your tree and then drag and drop the tree icon on the map to a more specific location.</p>
    <h5><strong>I entered the wrong information for my tree. Can I change it?</strong></h5>
    <p>Yes. On the Tree List view, you will be able to edit any tree you have contributed by hitting the edit button, as seen in the picture below. A modal will pop up and you can edit your tree there.</p>
    <img class="aboutSnippet" alt="Visual of Edit Button" src="../assets/aboutSnippet.png">
    <h5><strong>Can you delete a tree you have contributed? </strong></h5>
    <p>Yes. On the Tree List view, you will be able to delete any tree you have contributed by hitting the trash button.</p>
    <h5><strong>I have another question.</strong></h5>
    <p>Feel free to email about anything in particular. jaywinebrenner@gmail.com</p>

  
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">

@import '../styles/style.scss';

.aboutWrapper > h3, h5, h6, p {
  color: white;
  text-align: center;
  line-height: 1.8rem;
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
  margin: 10px 40vh;
  display: flex;
  flex-direction: column;
  background-color: $primary;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 600px) {
  .aboutWrapper {
    margin: 10px 5vh;
  }
  .aboutWrapper > h3, h5, h6, p {
    line-height: 1.5rem;
}
}

.aboutWrapper h5 {
  margin: 0!important;
}

.aboutWrapper p {
  line-height: 1!important;
}

.aboutTitle{
  margin-top: 20px;
  margin-bottom: 12px!important;
}

.aboutSnippet {
  width: 50vw;
}

@media screen and (max-width: 1400px) {
  .aboutWrapper {
    margin: 10px 10vh;
    display: flex;
    flex-direction: column;
    background-color: $primary;
    align-items: center;
    justify-content: center;
  }
  .aboutSnippet {
    width: 85vw;
  }

}

</style>
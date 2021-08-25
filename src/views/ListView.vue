<template>

<div>

  <ListItem
    v-for="tree in orderedTrees" :key="tree.id"
    :orderedTrees="orderedTrees"
    :tree="tree"

  />
              
  <div class="listViewWrapper">

    <div v-if="selectedFilter === 'My Trees' && orderedTrees.length == 0">
      <div class="sadWrapper">
        <h6>You haven't contributed any trees to the Fruit Finder.</h6>
        <p>If you know of a fruiting tree or bush, just push Add Tree in the upper right hand corner. </p>
        <img class="sadTree" src="../assets/customTreeBox.png" alt="SadTreePicture">
      </div>
    </div>

    <div v-else-if="selectedFilter === 'Custom Trees' && orderedTrees.length == 0">
      <div class="sadWrapper">
        <h6>You haven't created any Custom Trees. A custom tree is a Tree you add to The Fruit Finder that has it's own Custom Title. "Fred's Fruitful Italian Plum Tree", for example.</h6>
        <p>To create a Custom Tree, simply click "Add a Tree" in the upper right hand corner. After hitting the Select Tree Type dropdown, choose Custom Tree. A text input will be revealed where you can name your Custom Tree.</p>
        <img class="sadTree" src="../assets/customTreeBox.png" alt="SadTreePicture">
      </div>
    </div>

    <div v-else-if="orderedTrees.length == 0">
      <div class="sadWrapper">
        <h6>Hmmm, looks like this type of tree isn't near you.</h6>
        <p>Perhaps you should find one and add it to the Fruit Finder!</p>
        <img class="sadTree" src="../assets/sadtree.jpg" alt="SadTreePicture">
      </div>
    </div>

    <div class="treeCardWrapper" v-else v-for="tree in orderedTrees" :key="tree.id">
        
        <div class="treeCardTop__wrapper" @click="tree.visible = !tree.visible">
          <div class="treeCardTop__logoWrapper">
            <img
              class="treeCardTop__logo"
              alt="Vue logo"
              src="../assets/newLogoWhite.png"
            />
          </div>

          <div class="treeCardTop__typeTextWrapper">
            <h6 class="treeCardTop__typeText">{{ tree.treeType }}</h6>
            <h6 class="treeCardTop__distanceText">{{ calculateDistanceFromTree(tree.coordinates.lat, tree.coordinates.lng)}}</h6>
          </div>

          <div class='treeCardTop__buttonWrapper'>
            <!-- <img class="userSubImage" src="../assets/sadtree.jpg" alt=""> -->
            <img class="userSubImage" v-if="tree.urlOfTreeImage" :src="tree.urlOfTreeImage" alt="Picture of Tree">
            <img class="userSubImage" v-else src="../assets/customTreeBox.png" alt="Picture of Tree">


            <div class="deleteEditIconWrapper">
              <font-awesome-icon v-if="tree.userID === currentUserID" @click="areYouSure(tree.id)" id="deleteX" icon="trash-alt" size="sm"/>
              <font-awesome-icon v-if="tree.userID === currentUserID" @click="getTreeIdForEditing(tree.id)" id="editIcon" icon="edit" size="sm"/>
            </div>


            <div class="emptyDiv" v-if="tree.userID !== currentUserID"></div>

          </div>
        </div>

        <div v-bind:class="[!tree.visible ? 'accordianOpen' : 'treeCardBottom__Wrapper']">
          <div>
            <h6 class="treeCardBottom__typeText">{{ tree.formattedAddress }}</h6>
            <h6 class="treeCardBottom__distanceText">
              {{ tree.description }}
            </h6>
          </div>
          <div class="comment__wrapper">
            <hr>
            <div class="comment__top"></div>
            <h6 class="treeCardComment__typeText">Comments</h6>
            <h6 v-if="$parent.isLoggedIn" @click="showAddCommentModal(tree)" class="comment__button">Add Comment</h6>
            <h6 v-if="!$parent.isLoggedIn" class="comment__button">Login to Add Comment</h6>
          </div>

          <ul v-for="comment in allComments" :key="comment.index">
            <li v-if="comment.idOfCommentedTree === tree.id" :key="comment.index">
              <font-awesome-icon v-if="comment.idOfCommenter === currentUserID" @click="areYouSureDeleteComment(comment.id)" class="xIcon" icon="trash-alt" size="sm"/> 
              <span class="bold">    {{comment.commenterName}}  </span>  {{comment.comment}} <span class="comment__date">{{comment.dateTime}}</span>
            </li>
          </ul>

        </div>
      </div> 

    <modal class="modalWrapper" name="addCommentModal" :width="'90%'" :height="'75%'">
        <div class="xIconWrapper">
         <font-awesome-icon @click="hideAddCommentModal()" class="xIcon" icon="times" size="lg"/>
      </div>
      <div class="commentModal__header">
        <h5 class="modalHeader">Add a comment</h5>
      </div>
      
      <div class="formWrapper container mt-6">
        <b-form class="formWrapper" @submit.prevent="handleSubmitComment">

          <b-row md="1">
            <b-form-group>
              <b-form-textarea
                id="textArea"
                size="sm"
                v-model="comment"
                placeholder="Description"
                rows="5"
                max-rows="4"
              ></b-form-textarea>
            </b-form-group>
          </b-row>

          <button type="submit" id="submitTreeButton">
            <b-spinner small v-if="spinLoading" label="Spinning"></b-spinner
            ><span v-if="!spinLoading">Submit Comment</span>
          </button>


        </b-form>
      </div>

    </modal>

  </div>

</div>

</template>

<script>
import {db} from "@/main.js";
import { convertDistance } from 'geolib';
import getDistance from 'geolib/es/getPreciseDistance';
import moment from 'moment';
import ListItem from '../components/ListItem.vue'

export default {
  name: "ListView",
  props: {
    allTrees: Array,
    orderedTrees: Array,
    orderedComments: Array,
    currentUserID: String,
    currentUser: Object,
    myCoordinates: Object,
    selectedFilter: String,
    showEditTreeModal: Function,
    hideEditTreeModal: Function,
    getTreeIdForEditing: Function
  },
  components: {
    ListItem
  },
  data() {
    return {
      comment: null,
      spinLoading: false,
      idOfCommentedTree: null,
      allComments: []
    };
  },
  mounted() {
  },

      //   this.orderedTrees = this.allTrees.sort((a, b) =>
      // a.distance > b.distance ? 1 : -1,)
// return this.myRepos.slice().sort((a, b) => a.stargazers_count < b.stargazers_count)
      
  computed: {
    orderComments() {
      // return this.orderedComments.slice().sort((a, b) =>
      // a.dateTime > b.dateTime ? 1 : -1,)

      return this.orderedComments.slice().sort((a, b) =>
      a.dateTime > b.dateTime ? 1 : +1,)
    }

  }, 


  methods: {
    // orderComments() {
    //   this.orderedComments = this.allComments.sort((a, b) =>
    //   a.dateTime > b.dateTime ? 1 : -1,)
    // },
    openAccordian() {
      // tree.visible = !tree.visible
    },
    areYouSure(treeIDInput) {
      this.$fire({
        title: "Warning",
        text: "Are you sure you want to delete this tree?",
        type: "warning",
        timer: 3000
      }).then(r => {
            if(r.value) {
              db.collection("locations").doc(treeIDInput).delete().then(() => {
                  console.log("Document successfully deleted!");
              
              
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
            }
      });
    },
    areYouSureDeleteComment(commentId) {
      this.$fire({
        title: "Warning",
        text: "Are you sure you want to delete this comment?",
        type: "warning",
        timer: 3000
      }).then(r => {
            if(r.value) {
              db.collection("comments").doc(commentId).delete().then(() => {
                  console.log("Document successfully deleted!");
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
            }
      });
    },
    calculateDistanceFromTree(treeLat, treeLng) {
        let distance = getDistance( 
          { latitude: treeLat, longitude: treeLng },
          { latitude: this.myCoordinates.lat, longitude: this.myCoordinates.lng },
        )
        let distanceInMilesOrYards = this.milesOrYards(distance)
        // console.log("tree dis", distance)
        return distanceInMilesOrYards;
    },
    milesOrYards(distance) {
      if (distance < 1609.34) {
        let dist = Math.round(convertDistance(distance, "yd"));
        if (dist === 1) {
          return (dist + " yard away");
        } else {
          return(dist + " yards away");
        }
      } else {
        let dist = Math.round(convertDistance(distance, "mi"));
        if (dist === 1) {
          return (dist + " mile away");
        } else { 
          return(dist + " miles away");
        }
      }
    },
    showAddCommentModal(tree) {
      console.log("tree in modal", tree)
      this.idOfCommentedTree = tree.id
      console.log("idOfCommentTree", this.idOfCommentedTree)
      this.$modal.show("addCommentModal");
    },
    hideAddCommentModal() {
      this.$modal.hide("addCommentModal");
      this.comment = null;
      this.idOfCommentedTree = null;
    },
    async handleSubmitComment() {
     
      this.spinLoading = true;
      if (!this.comment) {
        this.$toastr.e(
              "You didn't fill out the form properly. Give it another shot!"
            );
        this.spinLoading = false;
        return;
      }

      let commentData = {
        commenterName: this.currentUser.displayName,
        comment: this.comment,
        idOfCommentedTree: this.idOfCommentedTree,
        idOfCommenter: this.currentUserID,
        dateTime: moment(new Date()).format('LLL')
      }

      await db
        .collection("comments")
        .add(commentData)
        .then(() => {
          console.log("upload successful!");
        });

      // Clean up 
      this.comment = "";
      this.hideAddCommentModal();
      this.spinLoading = false;
    },
  },

  created() {

      db.collection("comments").onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        let newComments = [];
        if (change.type === "added") {
            const changedData = change.doc.data();
            // console.log("Added: ", change.doc.data());
            newComments.push(changedData);

            this.allComments.push({
              ...change.doc.data(),
              id: change.doc.id, 
              visible: true
            });
            // this.orderComments()
          }
          if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
          }
          if (change.type === "removed") {
            // Find index of removed comment and remove it from UI
            var removeIndex = this.allComments.map(function(item) { return item.id; }).indexOf(change.doc.id);
            this.allComments.splice(removeIndex, 1);
          }
      });
    });
  }
};
</script>

<style lang='scss'>
@import "../styles/style.scss";

.listViewWrapper {
  background-color: $primary;
  display: flex;
  flex-flow: column;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.treeCardWrapper {
  width: 90%;
  border: 1px solid white;
  margin: 7px 0;
  border-radius: 5px;
  transition: 0.4s;
}

.treeCardTop__wrapper {
  display: flex;
  border: 1px solid white;
  align-items: center;
  cursor: pointer;
  transition:max-height 0.3s ease-out;
  height:auto;
  max-height:600px;
}

.treeCardBottom__Wrapper {
  background-color: white;
  padding: 10px;
  display: none;
  overflow: hidden;  
}

.accordianOpen {
  background-color: white;
  padding: 10px;
}

.treeCardTop__logoWrapper {
  border-right: 1px solid white;
  padding-right: 5px;
}

.treeCardTop__typeTextWrapper {
  margin-left: 1rem;
}

.treeCardTop__typeText {
  text-align: left;
}
.treeCardTop__distanceText {
  font-weight: 130;
  text-align: left;
  line-height: 8px;
}

.treeCardTop__logo { 
  width: 80px;
}

.treeCardTop__buttonWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: .5rem;
  margin-top: .1rem;
  margin-bottom: .1rem;
  color: white;
  border-radius: 5px;

}

.treeTopCard__detailsButton {
  cursor: pointer;
  padding: 5px;
  border: 1px solid white;
  border-radius: 5px;
}

.treeTopCard__deleteButton {
  cursor: pointer;
  margin-right: 1vh;
  border: 1px solid white;
  border-radius: 5px;
  background-color: white;
}

.treeTopCard__deleteButtonText {
  color: $primary;
}

.treeCardBottom__typeText {
  color: $primary;
  text-align: left;
  font-weight: 230;
}
.treeCardBottom__distanceText {
  color: $primary;
  text-align: left;
}

.deleteXWrapper{
  position: absolute;
}

.deleteEditIconWrapper {
  position: relative;
  padding: 3px 10px;
}

#deleteX {
  position: absolute;
  top: 5px;
}

#editIcon {
  position: absolute;
  bottom: 8px;
}

.emptyDiv {
  width: 10px;
}

.treeCardComment__typeText {
  color: $primary;
  text-align: left;
  font-weight: 230;
  display: inline-block;
}

.comment__button {
  cursor: pointer;
  padding: 3px;
  border-radius: 5px;
  background-color: $primary;
  display: inline-block;
  margin-left: 20px;
  font-size: .6rem;
}

.commentList__wrapper {
  padding: 5px 20px;
}

.comment__item {
  font-size: .7rem;
  color: #333333;
  text-align: left;
  font-weight: 300;
}
ul {
  list-style-type: none; 
  padding: 0; 
  margin: 0 0 0 20px;
}

li {
  font-size: .85rem;
  color: #6a6a6a;
}

.bold {
  font-weight: 700;
}

.comment__date {
  font-size: .5rem;
}

.sadTree {
  width: 200px;
}

.sadWrapper {
  text-align: center;
  width: 70vw;
}

.userSubImage {
  margin-right: 20px;
  object-fit: cover;
  border-radius:50%;
  width: 40px;
  height: 40px;
}

@media screen and (max-width: 600px) {
  .userSubImage {
    margin-right: 0px;
    left: 320px;
  }
  .treeCardTop__logo {
    width: 60px;
  }
}

// :style="{backgroundImage:'url(~@/assets/maroonGradient.png)'}"
</style>
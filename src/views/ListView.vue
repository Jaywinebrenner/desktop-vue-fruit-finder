<template>
  <div class="listViewWrapper">
    <div class="treeCardWrapper" v-for="tree in orderedTrees" :key="tree.id">
      <div class="treeCardTop__wrapper">
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

        <div class="treeCardTop__buttonWrapper">
          <div
            class="treeTopCard__detailsButton"
            @click="tree.visible = !tree.visible"
          >
            <p class="treeTopCard__detailsButtonText">Details</p>
          </div>

          <div 
          class="deleteXWrapper"
          v-if="tree.userID === currentUserID"
          @click="areYouSure(tree.id)">
            <font-awesome-icon id="deleteX" icon="times" size="sm"/>
          </div>

          <div class="emptyDiv" v-if="tree.userID !== currentUserID"></div>

        </div>
      </div>

      <div v-show="!tree.visible" class="treeCardBottom__Wrapper">
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
          <h6 @click="showAddCommentModal(tree)" class="comment__button">Add Comment</h6>
        </div>

        <div v-for="comment in fakeComments" :key="comment.index" class="commentList__wrapper">
          <h6 class="comment__item">
            <b>Commenter ()</b>{{comment.comment}}
          </h6>
        </div>
      </div>

    </div>

    <modal class="modalWrapper" name="addCommentModal" :width="'90%'" :height="'75%'">
        <div class="xIconWrapper">
         <font-awesome-icon @click="hideAddCommentModal()" class="xIcon" icon="times" size="lg"/>
      </div>
      <div class="commentModal__header">
        <!-- <h3>Add a comment to this {{ tree.treeType }}</h3> -->
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
</template>

<script>
import db from "@/main.js";
import {  convertDistance } from 'geolib';
import getDistance from 'geolib/es/getPreciseDistance';
import fakeComments from '../constants/fakeComments';
// import Comment from '../components/Comment.vue'
// import CommentForm from '../components/Comment-Form.vue'

export default {
  name: "ListView",
  props: {
    allTrees: Array,
    orderedTrees: Array,
    currentUserID: String,
    currentUser: Object,
    myCoordinates: Object,
  },
  components: {
    // Comment,
    // CommentForm
  },
  data() {
    return {
      isBottomOpen: false,
      fakeComments: this.fakeComments,
      comment: null,
      spinLoading: false,
      idOfCommentedTree: null,
      allComments: []
    };
  },
  mounted() {
    this.fakeComments = fakeComments
  },

  methods: {
    areYouSure(treeIDInput) {
      this.$fire({
        title: "Warning",
        text: "Are you sure you want to delete this tree?",
        type: "warning",
        timer: 3000
      }).then(r => {
            console.log(r);
            db.collection("locations").doc(treeIDInput).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
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
        idOfCommentedTree: this.idOfCommentedTree
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
      this.$toastr.s(
          "You have successfully left a comment!"
        );
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
          }
          if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
          }
          if (change.type === "removed") {
            // Find index of removed comment and remove it from UI
            var removeIndex = this.allCOmments.map(function(item) { return item.id; }).indexOf(change.doc.id);
            this.allComments.splice(removeIndex, 1);
          }

          // this.orderTrees()
      
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
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  height: 100vh;
  // h6 {
  //   color: #333333;
  // }
}

.treeCardWrapper {
  width: 90%;
  border: 1px solid white;
  margin: 7px 0;
  border-radius: 5px;
}

.treeCardTop__wrapper {
  display: flex;
  border: 1px solid white;
  align-items: center;
}

.treeCardBottom__Wrapper {
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
  margin-right: 1rem;
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
  position: relative;
 height: 55px;
 width: 3px;
 margin-left: 5px;
  cursor: pointer;
}

.deleteX {
  position: absolute;
  display: inline-block;
  color: #ffffff;
  cursor: pointer;
  width: 25px;
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
  color: #333333;
  text-align: left;
  font-weight: 300;
}
// :style="{backgroundImage:'url(~@/assets/maroonGradient.png)'}"
</style>
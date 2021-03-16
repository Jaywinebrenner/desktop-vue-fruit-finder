<template>
  <div class="listViewWrapper">
    <div class="treeCardWrapper" v-for="tree in allTrees" :key="tree.id">
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
          <h6 class="treeCardTop__distanceText">30 yards away</h6>
          <!-- <h6>{{  tree.id }}</h6> -->
        </div>

        <div class="treeCardTop__buttonWrapper">
          <div
            class="treeTopCard__deleteButton"
            v-if="tree.userID === currentUserID"
            @click="areYouSure(tree.id)"
          >
            <p class="treeTopCard__deleteButtonText">Delete</p>
          </div>

          <div
            class="treeTopCard__detailsButton"
            @click="tree.visible = !tree.visible"
          >
            <p class="treeTopCard__detailsButtonText">Details</p>
          </div>
        </div>
      </div>

      <div v-show="!tree.visible" class="treeCardBottom__Wrapper">
        <div>
          <h6 class="treeCardBottom__typeText">{{ tree.formattedAddress }}</h6>
          <h6 class="treeCardBottom__distanceText">
            {{ tree.description }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/main.js";
import {  convertDistance } from 'geolib';
// import firebase from "firebase/app";
// import "firebase/auth";

export default {
  name: "ListView",
  props: {
    allTrees: Array,
    currentUserID: String
  },
  data() {
    return {
      // allTrees: [],
      isBottomOpen: false
    };
  },
  mounted() {
    
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
    milesOrYards(distance) {
      if (distance < 1609.34) {
        let dist = Math.round(convertDistance(distance, "yd"));
        return(dist + " yards away");
      } else {
        let dist = Math.round(convertDistance(distance, "mi"));
        return (dist + " miles away");
      }
    }
    
  },

  //   userTrees() {
  //     return this.allTrees.filter(tree => tree.userID !== firebase.auth().currentUser.uid)
  //   },
  //   myTrees() {
  //       return this.allTrees.filter(tree => tree.userID === firebase.auth().currentUser.uid)
  //   },
  // },

  created() {
    this.allTrees && console.log("allTrees on List View", this.allTrees);
    // Listens for changes in DB
    // db.collection("locations").onSnapshot(res => {
    //   const changes = res.docChanges();
    //   console.log("changes", changes);

    //   changes.forEach(change => {
    //     // if (change.type === "added" || change.type == "") {
    //     this.allTrees.push({
    //       ...change.doc.data(),
    //       id: change.doc.id,
    //       visible: true
    //     });
    //     // }
    //   });
    // });
  }
};
</script>

<style lang='scss'>
@import "../styles/style.scss";

.listViewWrapper {
  background-color: $primary;
  display: flex;
  flex-flow: column;
  // height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.treeCardWrapper {
  width: 90%;
  border: 1px solid white;
  margin-top: 15px;
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

// :style="{backgroundImage:'url(~@/assets/maroonGradient.png)'}"
</style>
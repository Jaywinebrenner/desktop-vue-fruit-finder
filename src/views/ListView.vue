<template>
  <div class="listViewWrapper">
    <div class="homeSubheader">
      <h5 class="homeText">Browse the Map for Fruit Trees near you</h5>
    </div>
    <div class="mapListButtonWrapper">
      <router-link class="viewButton" to="/"
        ><button class="mapListButton">Map View</button></router-link
      >
      <router-link class="viewButton" to="/listview"
        ><button class="mapListButton">List View</button></router-link
      >
    </div>

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
            @click="areYouSure(tree.id)"
            class="treeTopCard__deleteButton"
          >
            <p class="treeTopCard__deleteButtonText">Delete</p>
          </div>
          <div
            @click="tree.visible = !tree.visible"
            class="treeTopCard__detailsButton"
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
export default {
  data() {
    return {
      allTrees: [],
      isBottomOpen: false,
      currentUserID: null
    };
  },
  mounted() {
    // this.allTrees && console.log("db on List View", this.allTrees);
  },

  methods: {
    areYouSure() {
        this.$fire({
            title: "Warning",
            text: "Are you sure you want to delete this tree?",
            type: "warning",
            timer: 3000
        }).then(r => {
          console.log(r.value);
        });
    },
    // deleteTree() {
    //   this.allTrees.map((treeIDInput) => {
    //       if(tree.id === treeIDInput) {

    //       }
    //   })

    
  },

  created() {
    // Listens for changes in DB
    db.collection("locations").onSnapshot(res => {
      const changes = res.docChanges();
      console.log("changes", changes);

      changes.forEach(change => {
        // if (change.type === "added" || change.type == "") {
        this.allTrees.push({
          ...change.doc.data(),
          id: change.doc.id,
          visible: true
        });
        // }
      });
    });
  },
};
</script>

<style lang='scss'>
@import "../styles/style.scss";

.listViewWrapper {
  background-color: $primary;
  display: flex;
  flex-flow: column;
  height: 100%;
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

.treeCardBottom__Wrapper {
  background-color: white;
  padding: 10px;
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
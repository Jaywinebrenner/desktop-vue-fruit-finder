  // Original method to get user coords with local storage zoom thing that is unclear to me
  
  
  created() {
    navigator.geolocation.getCurrentPosition(
      position => {
        //  console.log("lat", position.coords.latitude);
        //  console.log("long", position.coords.longitude);
      },

   )
    // does the user have a saved center? use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      // get user's coordinates from browser request
      this.$getLocation({})
        .then(coordinates => {
          this.myCoordinates = coordinates;
        })
        .catch(error => alert(error));
    }
    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },

  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => (this.map = map));
    // this.fetchMapStyle();
  },



  // cooods
  <!-- <div class="temporaryCoordDiv">
<div>
      <h6 style="color: white;">Your Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ myCoordinates.lat }} | Longitude: {{ myCoordinates.lng}}</p>
</div> 
<div>
      <h6 style="color: white;">Map Coordinates: </h6>
      <p style="color: white;">Latitdude: {{ mapCoordinates.lat }} | Longitude: {{ mapCoordinates.lng}}</p>

</div>
</div> -->



  // BEFORE ATTEMPTING TOOPEN DataTransfer
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
          <h6>{{  tree.id }}</h6>
        </div>

        <div class="treeCardTop__buttonWrapper">
          <div @click="openBottom(tree.id)" class="treeCardTop__button">Details</div>
        </div>
      </div>

      <div v-if="isBottomOpen" class="treeCardBottom__Wrapper">
        <div>
          <h6 class="treeCardBottom__typeText">N Albina and Killingsworth</h6>
          <h6 class="treeCardBottom__distanceText">
            {{ tree.description}}
          </h6>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import db from '@/main.js'
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
  methods: {
    openBottom() {
      this.isBottomOpen = !this.isBottomOpen;
    }
  }
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
  // display: flex;
  // flex-direction: column;
  width: 90%;
  border: 1px solid white;
  // justify-content: center;
  margin-top: 15px;
  border-radius: 5px;
}

.treeCardTop__wrapper {
  display: flex;
  border: 1px solid white;
  // justify-content: flex-start;
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
  margin-left: auto;
  margin-right: 1rem;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
}

.treeCardTop__button {
  padding: 5px;
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
</style>


{/* 
EXTRA PARAMS ON INPUT */}
          <!-- <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="cityInput"
                placeholder="City"
                class="input"
                v-model="formData.city"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="stateInput"
                placeholder="State"
                class="input"
                v-model="formData.state"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row md="1">
            <b-form-group>
              <b-form-input
                size="sm"
                id="zipInput"
                placeholder="Zip Code"
                class="input"
                v-model="formData.zip"
              ></b-form-input>
            </b-form-group>
          </b-row> -->
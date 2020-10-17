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

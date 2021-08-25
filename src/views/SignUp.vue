<template>
<div class="loginWrapper">

  <div class="loginCard">
  <div v-if="error" class="error">{{error.message}}</div>
  <form @submit.prevent="pressedSignUp">
    <h3>Sign Up</h3>
    <div class="nameInputWrapper">
      <input class="nameInput" type="text" v-model="name" placeholder="Name">
    </div>

    <progress v-if="uploading === true" value="0" max="100" id="uploader"></progress>

      <div class="profileImageInput">
        <b-form-file
          accept=".jpg, .png, .gif, .jpeg"
          size="sm"
          v-model="profileImage"
          placeholder="Upload a profile image"
          drop-placeholder="Drop file here..."
        ></b-form-file>
    <p class="imageInputSubheader">You can always upload the image later if you'd like</p>

      </div>
 
    <div class="email">
      <input type="email" v-model="email" placeholder="Email">
    </div>
    <div class="password">
      <input type="password" v-model="password" placeholder="password">
    </div>

    <button type="submit" class="signUpButton">
      <b-spinner small v-if="spinLoading" label="Spinning"></b-spinner>
      <span v-if="!spinLoading">Sign Up</span>
    </button>


  </form>
  </div>
  <img class='loginLogo' alt="Vue logo" src="../assets/newLogoWhite.png">

</div>
  
</template>

<script>

import * as firebase from "firebase/app"
import "firebase/auth";


export default {
  name:"SignUp",
  props: {
    showView: Function,
    
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      error: '',
      spinLoading: false,
      profileImage: null,
      uploading: null,
      // userUploadedImage: null
    }
  },
  methods: {
    async pressedSignUp() {
      this.spinLoading = true;
      if (!this.name) {
        this.$toastr.s(
              "Please enter your name. But, ya know, it doesn't have to be your real name."
            );
            this.spinLoading = false;
        return;
      }
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        // firebase.auth().currentUser.updateProfile({
        //   displayName: this.name
        // });


        // PUT PROFILE URL INTO CURRENT USER OBJECT 
        let uploader = document.getElementById('uploader');
        let file = this.profileImage;
        if(this.profileImage) {
          let storageRef = await firebase.storage().ref('profileImage/' + file.name);
          await storageRef.put(file);
          let task = storageRef.put(file);
    
          task.on('state_changed', 
            function progress(snapshot) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {
              console.log("ERROR??", err)
            },
          );
      } 

      // GET URL OF UPLOADED IMAGE
      await this.getImageUrl(file.name);
      console.log("URL IN SUMBIT", this.$parent.userUploadedImage )

        this.showView("Map");
        this.$toastr.s(
              "You have successfully created an account. Happy hunting!"
            );
        console.log("user", user);
        this.spinLoading = false;

      } catch (err) {
        console.log(err);
            this.$toastr.e(
              err
            );
        this.spinLoading = false;
      }
    },

    async getImageUrl(img) {

    let storageRef = await firebase.storage().ref();
    let imgRef = await storageRef.child('profileImage/' + img);

  // Get the download URL
    await imgRef.getDownloadURL()
    .then((url) => {
      console.log("DOWNLOAD URL", url)
      this.$parent.userUploadedImage = url;
      this.$parent.userUploadedImageState = url;
      // this.putImageInNavbar(this.userUploadedImage)
      return this.$parent.userUploadedImage ;
    })
    .catch((error) => {

    switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
        break;
      }
     });
     console.log("user IMage???", this.$parent.userUploadedImage)
        await firebase.auth().currentUser.updateProfile({
          displayName: this.name,
          photoURL: this.$parent.userUploadedImage
        });
        this.$parent.userDisplayName = this.name;
        this.$parent.userUploadedImage;
    },
  },
  

}
</script>

<style lang="scss">
@import '../styles/style.scss';

.loginWrapper {
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
}

.loginCard {
  background-color: white;
  padding: 20px;
  border: 1px black solid;
  border-radius: 2%;
  z-index: 5;
}

.error {
  color: red;
  font-size: 18px;
}

div > input {
  margin-bottom: 20px;
  width: 35vh;
  height: 35px;

}

.signUpButton {
  background-color: $primary;
  width: 35vh;
  height: 75px;
  font-size: 100%;
  color: white;
}

.profileImageInput {
  margin-top: 20px;
  width: 100%;
}

.nameInput {
  margin-bottom: 0!important;
}

.b-custom-control-sm {
      width: initial;
}

.signUpButton:hover {
  opacity: .8;
  transition: .3s;
}
.b-custom-control-sm.custom-file, .b-custom-control-sm .custom-file-input, .b-custom-control-sm .custom-file-label, .input-group-sm.custom-file, .input-group-sm .custom-file-input, .input-group-sm .custom-file-label {
      width: 17.2rem;
}

.custom-file-input ~ .custom-file-label[data-browse]::after {
  cursor: pointer;
}



</style>
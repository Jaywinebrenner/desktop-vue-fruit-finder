      
      // Non-Bootstrap form
      
     <form
      class="formWrapper"
          @submit="handleFormSubmit"
          method="post"
        >
        <input type="text" v-model="treeType" placeholder="Type of Tree">
        <textarea class="textArea" v-model="description" placeholder="Tree Description"></textarea>

        <input type="text" v-model="street" placeholder="Street">
        <input type="text" v-model="city" placeholder="City">
          <input type="text" v-model="state" placeholder="State">
        <input type="text" v-model="zip" placeholder="Zip Code">
      <button class="submitTreeButton">Submit Tree</button>

      <h1>DESC: {{description}}</h1>
      <h1>DESC: {{treeType}}</h1>

      </form> 
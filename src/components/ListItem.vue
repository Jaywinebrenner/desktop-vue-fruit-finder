<template>
    <div>
        
    </div>

        
</template>

<script>


export default {
  name:"listItem",
  props: {
      tree: Object,
      orderedTrees: Array
  },
  data() {
    return {
         showMobileMenu: false
    }
  },
  methods: {
      openAccordian() {
          this.isActive = !this.isActive;
      }
  },
  
}
</script>

<style lang="scss">
@import '../styles/style.scss';

</style>
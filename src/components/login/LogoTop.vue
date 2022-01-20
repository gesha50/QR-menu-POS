<template>
<div class="LogoTop q-my-md">
  <img
      width="110"
      height="110"
      class="q-mb-sm"
      src="../../assets/img/1.svg"
      alt="logo">
    <h5 class="no-margin text-center">QR-Menu</h5>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LogoTop",
    data() {
        return {

        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>
.LogoTop {
  h5 {
    font-family: 'Raleway',sans-serif;
    color: #ffffff;
    font-weight: bold;
  }
}
</style>

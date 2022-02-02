<template>
<div
  :style="drawer? 'display:block;' : 'display:none;'"
  class="DarkContainerForDrawer"
></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "DarkContainerForDrawer",
    props: ['drawer'],
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
.DarkContainerForDrawer {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #000;
  opacity: .5;
  z-index: 11111111;
}
</style>

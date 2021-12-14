<template>
<div class="CategoryBlock q-ma-sm" :class="bgColorCategory">
  <div class="CategoryBlock__forImg">
    <img :src="require('../../assets/img/category/'+ category.img +'.png')" class="CategoryBlock__img q-ma-sm" alt="">
  </div>
  <div class="CategoryBlock__text">
    {{category.name}}
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CategoryBlock",
    data() {
        return {

        }
    },
    props: {
        category: Object,
    },
    created() {},
    mounted() {},
    components: {},
    computed: {
      bgColorCategory() {
        if (this.category.isActive) {
          return 'bg-amber-8'
        }
        if (this.$q.dark.isActive) {
          return 'bg-black'
        }
        return 'bg-white'
      },
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
.CategoryBlock {
  border-radius: 11px;
  text-align: center;
  &__forImg {

  }
  &__img {
    width: 50px;
    height: 50px;
  }
}
</style>

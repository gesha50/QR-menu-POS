<template>
<div @click="changeCategory" class="CategoryBlock q-ma-sm" :class="bgColorCategory">
  <div class="CategoryBlock__forImg">
    <img v-if="category.image" :src="require('../../assets/img/category/'+ category.img +'.png')" class="CategoryBlock__img q-ma-sm" alt="">
    <img v-else :src="require('../../assets/img/category/burger.png')" class="CategoryBlock__img q-ma-sm" alt="">

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
    methods: {
      changeCategory() {
        if (!this.category.isActive) {
          // change category active
          this.$store.dispatch('items/changeCategory', this.category.id)
        }
      }
    },
})
</script>

<style lang="scss" scoped>
.CategoryBlock {
  cursor: pointer;
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

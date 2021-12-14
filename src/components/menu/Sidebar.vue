<template>
<div class="Sidebar">
  <category-block
    v-for="(category, index) in categories"
    :key="index"
    :category="category"
  ></category-block>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import CategoryBlock from "components/menu/CategoryBlock";

export default defineComponent({
    name: "Sidebar",
    data() {
        return {
          categories: [
            {
              name: 'Fast Food',
              img: 'burger',
              isActive: true,
            },
            {
              name: 'Fish',
              img: 'fish',
              isActive: false,
            },
            {
              name: 'Noodles',
              img: 'noodles',
              isActive: false,
            },
            {
              name: 'Cake',
              img: 'cake',
              isActive: false,
            },
            {
              name: 'Fast Food',
              img: 'burger',
              isActive: false,
            },
            {
              name: 'Fish',
              img: 'fish',
              isActive: false,
            },
            {
              name: 'Noodles',
              img: 'noodles',
              isActive: false,
            },
            {
              name: 'Cake',
              img: 'cake',
              isActive: false,
            },
          ]
        }
    },
    created() {},
    mounted() {},
    components: {
      CategoryBlock,
    },
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>
.Sidebar {
  position: fixed;
  width: 8.333333%;
  height: calc(100vh - 59px);
  overflow-y: auto;
}
</style>

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

        }
    },
    created() {
    },
    mounted() {
      this.$store.dispatch('items/getCategories')
    },
    components: {
      CategoryBlock,
    },
    computed: {
      categories() {
        return this.$store.getters['items/categories']
      },
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
.Sidebar {
  position: fixed;
  width: 110px;
  height: calc(100vh - 59px);
  overflow-y: auto;
}
</style>

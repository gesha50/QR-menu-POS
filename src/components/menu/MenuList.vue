<template>
<div class="MenuList q-pa-md">
    <div class="row">
      <card-item
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        class="col-3"
      ></card-item>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import CardItem from "components/menu/CardItem";

export default defineComponent({
    name: "MenuList",
    data() {
        return {
          items: [
            {
              id: 1,
              name: 'Цезарь с курицей',
              img: 'cesar.jpg',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 2,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 3,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: true,
              price: 1000,
              isActive: 0
            },
            {
              id: 4,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 5,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 6,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 7,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 8,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
          ]
        }
    },
    created() {},
    mounted() {},
    components: {
      CardItem,
    },
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>

</style>

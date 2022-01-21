<template>
<div class="DeliveryBlock q-pa-md">
    <q-btn
      :to="'/menu/delivery'"
      size="35px"
      round
      class="text-amber-6"
      color="pink-9"
      icon="local_shipping"
    />
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "DeliveryBlock",
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

<style lang="scss">
@media (max-width: $breakpoint-xs-max) {
  .DeliveryBlock {
      width: 70px;
      height: 70px;
      padding: 0;
      .q-btn {
        width: 100%;
        height: 100%;
        min-width: 100%;
        min-height: 100%;
        .q-icon {
            font-size: 40px;
        }
       }   
    }
}
</style>

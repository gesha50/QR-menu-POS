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

<style lang="scss" scoped>

</style>

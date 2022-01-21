<template>
<div class="TakeAwayBlock q-pa-md">
    <q-btn
      :to="'/menu/take-away'"
      class="text-amber-6"
      size="35px"
      round
      color="indigo-10"
      icon="next_week"
    />
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "TakeAwayBlock",
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
  // <599px
@media (max-width: $breakpoint-xs-max) {
  .TakeAwayBlock {
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

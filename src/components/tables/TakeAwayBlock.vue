<template>
<div class="TakeAwayBlock q-pa-md">
    <q-btn
      :to="'/menu/take-away'"
      color="red-8"
      size="xl"
      label="С собой"
      rounded
    >
      <div
        class="bg-white column content-center justify-center q-ml-lg"
        style="border-radius: 50%; width: 50px; height: 50px; margin-right: -10px;"
      >
        <img
          style="padding: 2px"
          width="33"
          src="../../assets/img/index/take-away.png"
        >
      </div>
    </q-btn>
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

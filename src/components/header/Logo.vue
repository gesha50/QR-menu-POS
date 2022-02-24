<template>
    <div>
        <div>
            <router-link class="flex" to="/" style="text-decoration: none;">
              <div class="flex items-center">
                <img class="logo-mobile" src="../../assets/img/1.svg" alt="">
                <div
                  :class="{'logo__dark': $q.dark.isActive}"
                  class="q-ml-sm logo__title desktop-only"
                >
                  QR-Menu
                </div>
              </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Logo",
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
.logo {
  &__title {
    font-family: RalewayBold;
    font-style: normal;
    font-weight: bold;
    color: #1E1E1E;
  }
  &__dark {
    color: white;
  }
}
.logo-mobile {
  width: 40px;
}
</style>

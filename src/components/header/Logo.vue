<template>
    <div>
        <div v-if="$q.dark.isActive">
            <router-link class="flex" to="/">
                <img class="logo desktop-only" src="../../assets/img/logo.svg">
                <img class="logo-mobile mobile-only" src="../../assets/img/logo_icon.svg">
            </router-link>
        </div>
        <div v-else>
            <router-link class="flex" to="/">
                <img class="logo desktop-only" src="../../assets/img/logo.svg">
                <img class="logo-mobile mobile-only" src="../../assets/img/logo_icon.svg">
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

<style scoped>
.logo {
  width: 130px;
}
.logo-mobile {
  width: 50px;
}
</style>
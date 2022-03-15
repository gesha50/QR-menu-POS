<template>
  <q-header class="text-white header" :class="$q.dark.isActive? 'bg-black' : 'bg-white'">
    <q-toolbar>
      <q-toolbar-title class="row">
        <Logo/>
      </q-toolbar-title>
      <q-input
        v-if="isMenuActive"
        dense
        standout="bg-grey-6 text-white"
        class="q-mr-md input-desktop"
        :model-value="searchItemInMenu"
        @update:model-value="searchItem($event)"
      >
        <template v-slot:prepend>
          <q-icon v-if="searchItemInMenu === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="searchItem('')" />
        </template>
      </q-input>
      <q-btn
        v-if="isMenuActive"
        class="q-mr-sm cartBtn-mobile"
        :class="cart.length? 'red' : 'grey'"
        rounded
        :color="cart.length ? 'red-5' : 'grey-6'"
        :label="`Items in Cart (${cart.length})`"
        @click='$emit("openCloseDrawer", this.drawer)'
      >
        <q-badge v-if="cart.length>0" class="mobile-only" color="white" text-color="black" floating>
          {{ cart.length }}
        </q-badge>
      </q-btn>
      <q-btn v-if="isWaiterActive" to="/orders" class="q-mr-sm text-blue-grey-9 q-btn-item-mobile" round color="amber-5" icon="fas fa-concierge-bell" :size="'md'" />
      <q-btn
        v-if="isWaiterActive"
        class="text-amber-5 q-btn-item-mobile"
        round
        color="blue-grey-9"
        icon="fas fa-bell"
        :size="'md'"
        @click='$emit("openCloseNotifyDrawer", this.notifyDrawer)'
      >
        <q-badge v-if="notificationsNumber>0" color="red" floating>{{ notificationsNumber }}</q-badge>
      </q-btn>
      <q-btn v-if="isWaiterActive" to="/archive" class="q-mx-sm q-btn-item-mobile" round color="blue-grey-8" icon="far fa-folder-open" :size="'md'" />
      <q-btn to="/settings" round color="grey-7" class="q-btn-item-mobile" icon="fas fa-cog" :size="'md'" />
      <q-btn
        class="q-ml-sm q-btn-item-mobile"
        v-if="isWaiterActive"
        @click="logout"
        round
        color="red"
        icon="fas fa-power-off"
        :size="'md'"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import Logo from "components/header/Logo"
export default {
  name: "MainHeader",
  emits: ["openCloseNotifyDrawer", 'openCloseDrawer'],
  props: {
    isWaiterActive: Boolean,
    drawer: Boolean,
    notifyDrawer: Boolean,
  },
  data() {
    return {

    }
  },
  components: {
      Logo
    },
  computed: {
    searchItemInMenu() {
      return this.$store.getters['items/searchItemInMenu']
    },
    isMenuActive() {
      return this.$route.path.split('/')[1] === 'menu'
    },
    table_id() {
      return this.$route.path.split('/')[2]
    },
    cart() {
      return this.$store.getters['items/ItemsInCart'](this.table_id)
        ? this.$store.getters['items/ItemsInCart'](this.table_id).curCart
        : []
    },
    notificationsNumber() {
      let arr = this.$store.getters['notify/notifications'].filter(el=> !el.isReading)
      return arr.length
    }
  },
  methods: {
    searchItem(val){
      this.$store.dispatch('items/setSearchItemInMenu', val)
    },
    logout() {
      this.$store.dispatch('settings/logoutWaiter', this.$store.getters['settings/getIsRestaurant'])
      if (this.$store.getters['settings/getIsRestaurant']) {
        this.$router.push('/restaurant')
      } else {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 4px 0;
}
.logo {
  width: 130px;
}
// >1440px
@media (min-width: $breakpoint-md-max) {

}
// >1024px  <1439px
@media (min-width: $breakpoint-sm-max) and (max-width: $breakpoint-md-max) {

}
// >600px and <1023px
@media (min-width: $breakpoint-xs-max) and (max-width: $breakpoint-sm-max) {
  .q-field {
    width: 140px;
  }
  .cartBtn-mobile {
    font-size: 12px;
  }
}
// <599px
@media (max-width: $breakpoint-xs-max) {
  .q-field {
    display: none;
  }
  .cartBtn-mobile {
    width: 35px;
    height: 35px;
    font-size: 0;
    &:after {
      content: " ";
      width: 55%;
      height: 55%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: url("../../assets/img/bi_cart.svg") no-repeat left top;
      background-size: 100% 100%;
      z-index: 9;
    }
  }
  .q-btn-item-mobile {
    width: 35px;
    height: 35px;
    font-size: 11px!important;
  }
}
</style>

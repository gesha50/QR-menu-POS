<template>
<q-page>
  <div class="column justify-evenly items-center">
    <logo-top></logo-top>
    <div class="bg q-pb-lg">
      <div class="header-block column justify-center q-mb-lg relative-position">
        <h3 class="no-margin text-center">{{ $t('waiters.list') }}</h3>
        <div class="absolute-top-right">
          <q-btn
            :to="{ name: 'restaurant.settings' }"
            class="bg-white"
            round
            icon="settings"
          />
        </div>
        <div class="input-container q-mx-auto q-mt-md relative-position	">
          <q-input color="black" dense rounded outlined v-model="searchText">
            <template v-slot:prepend>
              <q-avatar>
                <q-icon name="search" size="sm" />
              </q-avatar>
            </template>
          </q-input>
          <!-- <input v-model="searchText" class="no-border q-py-sm" type="text" name="waiterSearch" :placeholder="$t('search')"> -->
        </div>
      </div>
      <div class="scroll-bar scroll-y overflow-auto">
          <div
            v-if="isLoadingWaiters"
            class="flex justify-center"
          >
            <loader-x-l />
          </div>
        <div v-else class="LoginPage row justify-around items-center">
          <div class="col-12 col-sm-6 col-md-4" v-for="(waiter, i) in filteredWaiters" :key="i">
            <waiter-card
              :waiter="waiter"
            ></waiter-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import {api} from "boot/axios";
import LogoTop from "components/login/LogoTop";
import WaiterCard from "components/login/WaiterCard";
import LoaderXL from "components/loader/LoaderXL";

export default {
  name: "Waiters",
  data() {
    return {
      searchText: '',
      waiters: [],
      isLoadingWaiters: false
    }
  },
  components: {
    LogoTop,
    WaiterCard,
    LoaderXL
  },
  mounted() {
    this.getAllWaiters()
  },
  computed: {
    filteredWaiters() {
      if (this.searchText) {
        return this.waiters.filter(el=>{
          let str = el.name.toLowerCase()
          return str.includes(this.searchText.toLowerCase())
        })
      }
      return this.waiters
    }
  },
  methods: {
    getAllWaiters() {
      this.isLoadingWaiters = true
      api.get('/api/staff/list', {
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('ownerToken')
        }
      })
      .then(res=>{
        console.log(res.data)
        this.waiters = res.data.list
        this.isLoadingWaiters = false
      })
      .catch(e=>{
        this.isLoadingWaiters = false
        console.log(e)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.q-page {
  .bg {
    width: 900px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    padding: 20px 30px;
    .header-block {
      h3 {
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 130%;
      }
      .input-container {
        img {
          width: 20px;
          height: 20px;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          background: #F5F5F5;
          border-radius: 50px;
          outline: none;
          padding-left: 40px;
          font-family: 'Raleway',sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 120%;
          color: #000;
          &:placeholder {
            color: #B5B5B5;
          }
        }
      }
    }
    .scroll-bar {
      max-height: 300px;
    }
    .scroll-bar::-webkit-scrollbar {
      display: none;
    }
    .LoginPage {

    }
  }
}
@media (max-width: $breakpoint-sm-max) {
  .q-page {
    .bg {
      width: 90%;
      padding: 15px 25px;
    }
  }
}
@media (max-width: $breakpoint-xs-max) {
  .q-page {
    .bg {
      width: 80%;
      padding: 10px 20px;
    }
  }
  .waiters {
    padding: 0 0 10px 0 !important;
  }
}
</style>

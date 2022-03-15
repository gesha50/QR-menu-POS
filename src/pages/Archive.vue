<template>
  <q-page>
    <div class="main-block">
      <div class="tab" :class="showSidebar ? 'padding-right' : '' ">
        <div class="tab-root shadow-N rounded-borders bg-white">
          <q-tabs
            v-model="tab"
            class="tab-flex"
            active-class="btn-active"
            indicator-color="transparent"
          >
            <q-tab class="tab-btn" name="mails" label="Order History" />
            <q-tab class="tab-btn" name="alarms" label="Order On Hold" />
            <q-tab class="tab-btn" name="movies" label="Offline Order" />
          </q-tabs>
        </div>
        <div class="root">
          <div
            v-if="!isLoadingOrders"
            class="flex justify-center"
            style="height: 100vh;"
          >
            <loader-x-l
              style="margin-top: 100px;"
            />
          </div>
          <q-tab-panels v-else v-model="tab" class="text-white">
            <q-tab-panel class="tab-panel" name="mails">
              <div class="search-form">
                <input v-model="searchText" type="text" placeholder="Search Order ID or price">
                <img src="../assets/img/icons_search.svg" alt="search">
              </div>
              <div class="tabel-block">
                <div class="tabel-head">
                  <p>Order ID</p>
                  <p>Date</p>
                  <p>Total Sales</p>
                </div>
                <div class="tabel-body" v-for="(row, index) in filteredRows" :key="index">
                  <archive-list
                    :CurrentActive="CurrentActive"
                    :archive_data="row"
                    @addToCheck="addToCheck"
                  />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel class="tab-panel" name="alarms">
              <div class="search-form">
                <input v-model="searchText" type="text" placeholder="Search Order ID or price">
                <img src="../assets/img/icons_search.svg" alt="search">
              </div>
              <div class="tabel-block">
                <div class="tabel-head">
                  <p>Order ID</p>
                  <p>Date</p>
                  <p>Total Sales</p>
                </div>
                <div class="tabel-body" v-for="(row, index) in isActiveRows" :key="index">
                  <archive-list
                    :CurrentActive="CurrentActive"
                    :archive_data="row"
                    @addToCheck="addToCheck"
                  />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel class="tab-panel" name="movies">

            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
      <div class="sidebar" :class="showSidebar ? 'open-sidebar' : '' ">
          <print-sidebar
            :id="id"
            :restaurantName="restaurantName"
            :items="items"
            :totalPrice="totalPrice"
          />
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import PrintSidebar from "components/menu/PrintSidebar";
import ArchiveList from "components/archive/ArchiveList";
import LoaderXL from "components/loader/LoaderXL";

export default defineComponent({
    name: "Archive",
    data() {
      return {
        searchText: '',
        CurrentActive: null,
        id: null,
        restaurantName: this.$q.localStorage.getItem('restaurantName'),
        items: [],
        totalPrice: null,
        showSidebar: false,
        tab: ref('mails'),
      }
    },
    created() {},
    mounted() {
      this.$store.dispatch('archive/getOrders')
    },
    components: {
      PrintSidebar,
      ArchiveList,
      LoaderXL,
    },
    computed: {
      isLoadingOrders() {return !!this.rows.length;},
      rows() {
        return this.$store.getters['archive/rows']
      },
      filteredRows() {
        console.log(this.rows)
        if (this.searchText) {
          return this.rows.filter(el=>{
            let ID = el.ID.toString()
            let price = el.price.toString()
            return ID.includes(this.searchText) || price.includes(this.searchText)
          })
        }
        return this.rows
      },
      isActiveRows() {
        if(this.searchText){
          return this.rows.filter(el=>{
            let ID = el.ID.toString()
            let price = el.price.toString()
            return ID.includes(this.searchText) || price.includes(this.searchText)
          })
        }
        return this.rows.filter(function(row) {
            if(row.status !== 'Closed'){
                return row
            }
            else{
              return false
            }
         })
      },

    },
    methods: {
      addToCheck(data) {
        if (this.CurrentActive === data.ID || isNaN(this.CurrentActive)) {
          this.showSidebar = !this.showSidebar
        } else {
          if (!this.showSidebar) {
            this.showSidebar = !this.showSidebar
          }
        }
        this.CurrentActive = data.ID
        this.id = data.ID
        this.items = data.items
        this.totalPrice = data.price
      }
    },
})
</script>

<style lang="scss">
.main-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px 20px 20px;
  .sidebar {
    width: 350px;
    position: fixed;
    transform: translateX(350px);
    right: 0;
    bottom: 0;
    top: 58px;
    z-index: 999;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
  }
  .open-sidebar {
    transform: translateX(0);
    transition: all 0.2s;
  }
  .q-tab {
    padding: 0;
    height: auto!important;;
    min-height:auto!important;
  }
  .padding-right {
    padding-right: 350px;
  }
  .tab {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: all 0.2s;
    .tab-root {
      padding: 10px;
      margin-bottom: 20px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      .tab-flex {
        .q-tabs__content {
          height: auto;
          min-height: auto;
          flex: none;
          display: flex;
          flex: none;
          justify-content: left;
        }
        .tab-btn {
          padding: 5px 20px;
          height:auto;
          border-radius: 8px;
          border: 1px solid transparent;
          margin-right: 10px;
          .q-tab__content {
            padding: 0;
            height: auto!important;;
            min-height:auto!important;
          }

        }
        .btn-active {
          color: #BF9A6A;
          border: 1px solid #BF9A6A;
          border-radius: 8px;
        }
      }
    }
    .root {
      .q-tab-panels {
        border-radius: 10px;
        padding: 20px 20px 30px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
        .tab-panel {
          padding: 0;
          .search-form {
            position: relative;
            display: block;
            margin: 0 0 20px;
            input {
              width: 100%;
              padding: 15px 0 15px 30px;
              border: none;
              outline: none;
              font-family: 'Raleway',sans-serif;
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 19px;
              margin: 0;
              font-feature-settings: 'pnum' on, 'lnum' on;
              color: #010101;
              border-bottom: 1px solid #cccccc;
            }
            img {
              width: 20px;
              height: 20px;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }
          }
          .tabel-block {
            .tabel-head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: $grey-4;
              border-radius: 8px;
              padding: 15px 10px;
              p {
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: 130%;
                margin: 0;
                font-feature-settings: 'pnum' on, 'lnum' on;
                color: #1E1E1E;
              }
            }
            .tabel-body {
              .tabel-body-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 8px;
                padding: 15px 10px;
                cursor: pointer;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                &:nth-child( even) {
                  background: rgba(0, 0, 0, 0.07);
                }
                &:nth-child(odd) {
                  background: #ffffff;
                }
                &:hover {
                  p {
                    color: #000000;
                  }
                }
                p {
                  font-style: normal;
                  font-weight: normal;
                  font-size: 16px;
                  line-height: 130%;
                  margin: 0;
                  font-feature-settings: 'pnum' on, 'lnum' on;
                  color: #898690;
                  transition: all 0.2s;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

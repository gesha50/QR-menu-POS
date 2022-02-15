<template>
<div class="Orders">
  <div class="q-pa-md">
    <q-table
      title="Orders"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :pagination="{rowsPerPage: 20}"
      flat
      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ID" :props="props">
            {{ props.row.ID }}
          </q-td>
          <q-td key="created_at" :props="props">
              {{ props.row.created_at }}
          </q-td>
          <q-td key="table" :props="props">
              {{ props.row.table }}
          </q-td>
          <q-td key="items" :props="props">
              {{ props.row.items }}
          </q-td>
          <q-td key="price" :props="props">
              {{ props.row.price }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge color="teal">
              {{ props.row.status }}
            </q-badge>
          </q-td>
          <q-td key="actions" :props="props">

            <template v-for="(action, i) in props.row.actions" :key="i">
              <div v-if="action === 'действий не требуется'" >
                действий не требуется
              </div>
              <q-btn
                size="sm"
                class="q-mr-sm"
                color="red-7"
                v-else-if="action === 'rejected_by_restaurant'"
                @click="changeStatus(props.row, action)"
              >
                отменить
              </q-btn>
              <q-btn
                size="sm"
                color="green-7"
                v-else-if="action === 'accepted_by_restaurant'"
                @click="changeStatus(props.row, action)"
              >
                принять
              </q-btn>
              <q-btn
                size="sm"
                color="blue-7"
                v-else-if="action === 'prepared'"
                @click="changeStatus(props.row, action)"
              >
                готовый
              </q-btn>
              <q-btn
                size="sm"
                color="blue-9"
                v-else-if="action === 'delivered'"
                @click="changeStatus(props.row, action)"
              >
                доставленный
              </q-btn>
              <q-btn
                size="sm"
                color="orange-7"
                v-else-if="action === 'closed'"
                @click="changeStatus(props.row, action)"
              >
                закрыто
              </q-btn>
              <q-btn
                size="sm"
                v-else
                color="accent"
                @click="changeStatus(props.row, action)"
              >
                {{ action }}
              </q-btn>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div></div>
</template>

<script>
import { defineComponent } from 'vue';
import {api} from "boot/axios";
import {LocalStorage} from "quasar";

export default defineComponent({
    name: "Orders",
    data() {
        return {
          intervalID: null
        }
    },
    created() {
      this.$store.dispatch('orders/getOrders')
    },
    mounted() {
      this.intervalID = setInterval(()=>{
        console.log('server get orders')
        this.$store.dispatch('orders/getOrders')
        console.log(this.rows)
      }, 10000)
    },
    unmounted() {
      clearInterval(this.intervalID)
    },
  components: {},
    computed: {
      columns() {
        return this.$store.getters['orders/columns']
      },
      rows() {
        return this.$store.getters['orders/rows']
      }
    },
    methods: {
      changeStatus(order, alias) {
        console.log(order)
        api.get(`/api/v3/vendor/updatestatus/${alias}/${order.ID}`, {
          headers: {
            Authorization: 'Bearer '+LocalStorage.getItem('userToken')
          }
        })
          .then((res) => {
            console.log(res.data)
            this.$store.dispatch('orders/getOrders')
          })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
      }
    },
})
</script>

<style lang="scss" scoped>

</style>

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
            <q-badge color="green">
              {{ props.row.created_at }}
            </q-badge>
          </q-td>
          <q-td key="table" :props="props">
            <q-badge color="purple">
              {{ props.row.table }}
            </q-badge>
          </q-td>
          <q-td key="items" :props="props">
            <q-badge color="orange">
              {{ props.row.items }}
            </q-badge>
          </q-td>
          <q-td key="price" :props="props">
            <q-badge color="primary">
              {{ props.row.price }}
            </q-badge>
          </q-td>
          <q-td key="status" :props="props">
            <q-badge color="teal">
              {{ props.row.status }}
            </q-badge>
          </q-td>
          <q-td key="actions" :props="props">
            <q-badge color="accent">
              {{ props.row.actions }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Orders",
    data() {
        return {
        }
    },
    created() {},
    mounted() {
      this.$store.dispatch('orders/getOrders')
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
    methods: {},
})
</script>

<style lang="scss" scoped>

</style>

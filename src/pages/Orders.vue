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

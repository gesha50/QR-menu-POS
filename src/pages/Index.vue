<template>
  <q-page class="window-width row">
    <table-block
      v-for="(table, index) in tables"
      :key="index"
      :table="table"
      class="col-3"
    ></table-block>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TableBlock from "components/TableBlock";

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      tables: [
        {
          id: 1,
          locationGroup: '',
          status: 1,
        },
        {
          id: 2,
          locationGroup: '',
          status: 0,
        },
        {
          id: 3,
          locationGroup: '',
          status: 2,
        },
        {
          id: 4,
          locationGroup: '',
          status: 0,
        },
        {
          id: 5,
          locationGroup: '',
          status: 3,
        },
        {
          id: 6,
          locationGroup: '',
          status: 0,
        },
        {
          id: 7,
          locationGroup: '',
          status: 0,
        },
        {
          id: 8,
          locationGroup: '',
          status: 0,
        },
      ],
    }
  },
  components: {
    TableBlock,
  },
})
</script>

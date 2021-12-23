<template>
  <q-page
    class="window-width"
  >
    <div v-if="!areasTablesObj" class="">loading</div>
    <div v-else class="">
      <q-tabs
        v-model="tab"
        mobile-arrows
        class="bg-purple text-white shadow-2 full-width"
        dense
        align="justify"
      >
        <q-tab
          v-for="(area, i) in areasTablesObj"
          :key="i"
          :name="translitName(area.restoArea.name)"
          :label="area.restoArea.name"
        />
        <q-tab
          v-if="otherTables"
          name="otherTables"
          :label="$t('table.OtherTables')"
        />
      </q-tabs>
      <q-separator class="full-width"/>
      <q-tab-panels
        v-model="tab"
        class="bg-transparent"
        animated
      >
        <q-tab-panel
          v-for="(area, i) in areasTablesObj"
          :key="i"
          class="row"
          :name="translitName(area.restoArea.name)"
        >
          <div class="col-3 row justify-around">
            <take-away-block />
            <delivery-block />
          </div>
          <table-block
            v-for="(table, index) in area.tables"
            :key="index"
            :table="table"
            class="col-3"
          ></table-block>
        </q-tab-panel>
        <q-tab-panel v-if="otherTables" name="otherTables" class="row">
          <div class="col-3 row justify-around">
            <take-away-block />
            <delivery-block />
          </div>
          <table-block
            v-for="(table, index) in otherTables"
            :key="index"
            :table="table"
            class="col-3"
          ></table-block>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TableBlock from "components/tables/TableBlock";
import { translit } from '../assets/functions/translit'
import DeliveryBlock from "components/tables/DeliveryBlock";
import TakeAwayBlock from "components/tables/TakeAwayBlock";

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      tab: ''
    }
  },
  computed: {
    areasTablesObj() {
      return this.$store.getters['items/areasTablesObj']
    },
    otherTables() {
      return this.$store.getters['items/otherTables']
    },
  },
  methods: {
    translitName(name) {
      return translit(name)
    }
  },
  created() {
    this.$store.dispatch('items/getTable')
  },
  components: {
    TableBlock,
    DeliveryBlock,
    TakeAwayBlock,
  },
})
</script>

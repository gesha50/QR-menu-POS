<template>
  <q-page
    class="window-width"
  >
    <div v-if="!areasTablesObj" class="">loading</div>
    <div v-else class="">
      <div class="tableTabs" style="padding: 16px;">
        <q-tabs
          v-model="tab"
          mobile-arrows
          class="bg-white text-grey-6 full-width tableTabs__links"
          dense
          align="justify"
          indicator-color="red-8"
          active-color="black"
        >
          <q-tab
            v-for="(area, i) in areasTablesObj"
            :key="i"
            :name="translitName(area.restoArea.name)"
            :label="area.restoArea.name"
            style="border-right: 1px solid #F5F5F5"
          />
          <q-tab
            v-if="otherTables"
            name="otherTables"
            :label="$t('tables.OtherTables')"
          />
        </q-tabs>
      </div>
      <q-tab-panels
        v-model="tab"
        class="bg-transparent"
        animated
      >
        <q-tab-panel
          v-for="(area, i) in areasTablesObj"
          :key="i"
          :name="translitName(area.restoArea.name)"
        >
          <div class="row">
            <table-block
            v-for="(table, index) in area.tables"
            :key="index"
            :table="table"
            class="col col-xs-12 col-sm-6 col-md-3"
          ></table-block>
          </div>
        </q-tab-panel>
        <q-tab-panel v-if="otherTables" name="otherTables" class="row">
          <table-block
            v-for="(table, index) in otherTables"
            :key="index"
            :table="table"
            class="col-3"
          ></table-block>
        </q-tab-panel>
      </q-tab-panels>
      <div class="row justify-end absolute-bottom-right">
        <take-away-block />
        <delivery-block />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TableBlock from "components/tables/TableBlock";
import { translit } from 'assets/functions/translit'
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
      return this.$store.getters['items/areasTablesObj'].filter(area=> !!area.tables.length)
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
  mounted() {
    this.$store.dispatch('items/getTable')
    setTimeout(()=>{
      this.tab = this.$store.getters['items/firstScreenTables']
    },100)
  },
  components: {
    TableBlock,
    DeliveryBlock,
    TakeAwayBlock,
  },
})
</script>

<style lang="scss">
.tableTabs {
  &__links {
    height: 60px;
    font-family: 'RalewayBold';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
  }
}

</style>

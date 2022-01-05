<template>
<div class="DialogVariantsExtras">
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="row">
        <div class="col-6">
          <div v-if="item.options.length" class="q-gutter-sm">
            <div
              v-for="(op, inx) in item.options"
              :key="inx"
              class=""
            >
              <div class="">{{op.name}}: {{op.value}}</div>
              <div
                v-for="(optionName, ind) in op.options.split(',')"
                :key="ind"
                class=""
              >
                {{optionName}}
                <input
                  type="radio"
                  :checked="optionName === op.value"
                  :value="optionName"
                  @change="changeOptions($event, op)"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="">Extra</div>
          <div
            v-for="(extra, i) in item.extras"
            :key="i"
            class=""
          >
            <q-toggle
              size="xl"
              v-model="extraArr"
              :val="extra.id"
              :label="extra.name"
              left-label
            />
            <div class="">+ {{ extra.price + ' ' + $t('valuta') }} </div>
          </div>
        </div>
      </div>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="red" label="Отмена" @click="onCancelClick" />
        <q-btn :disable="isChooseVariant" color="green" label="Добавить в заказ" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "DialogVariantsExtras",
    emits: ['ok', 'hide'],
    props: {
      item: Object
    },
    data() {
        return {
          extraArr: [],
        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {
      isChooseVariant() {
        let isEmptyValue = false
        this.item.options.forEach(op=>{
          if (op.value === '') {
            isEmptyValue = true
          }
        })
        return isEmptyValue
      },
      table_id() {
        return this.$route.path.split('/')[2]
      },
    },
    methods: {
      changeOptions(e, op) {
        this.$store.dispatch('items/changeOptionValue', [e.target.value, this.item, op.id])
      },
      // following method is REQUIRED
      // (don't change its name --> "show")
      show () {
        this.$refs.dialog.show()
      },

      // following method is REQUIRED
      // (don't change its name --> "hide")
      hide () {
        this.$refs.dialog.hide()
      },

      onDialogHide () {
        // required to be emitted
        // when QDialog emits "hide" event
        this.$emit('hide')
      },
      onOKClick () {
        // on OK, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog
        this.$emit('ok')
        // or with payload: this.$emit('ok', { ... })

        this.$store.dispatch('items/addItemInCart', [this.item, this.table_id, this.extraArr])

        // then hiding dialog
        this.hide()
      },

      onCancelClick () {
        // we just need to hide the dialog
        this.hide()
      }
    },
})
</script>

<style lang="scss" scoped>

</style>

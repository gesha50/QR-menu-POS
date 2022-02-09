<template>
<div class="DialogVariantsExtras">
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pt-sm q-pb-lg">
      <div class="row q-pa-lg">
        <div class="col-12">
          <div v-if="item.options.length" class="q-gutter-sm">
            <div
              v-for="(op, inx) in item.options"
              :key="inx"
            >
              <div class="name">{{op.name}}:</div>
              <div class="q-pt-sm toggle-options">
                <div class="toggle-btn-inner" v-for="(optionName, ind) in op.options.split(',')"
                  :key="ind">
                    <q-btn-toggle
                      padding="12px 41px"
                      v-model="sizeModel"
                      color="blue-grey-1"
                      text-color="grey-7"
                      toggle-color="red-5"
                      toggle-text-color="white"
                      @update:model-value="changeOptions($event, op)"
                      unelevated
                      :options="[
                        {label: optionName, value: optionName},
                      ]"
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-12 q-mt-lg">
          <div class="name">Temprature:</div>
          <div class="q-pt-sm">
            <div>
              <q-btn-toggle
                padding="10px 30px"
                v-model="temprature"
                color="blue-grey-1"
                text-color="grey-7"
                toggle-color="red-5"
                toggle-text-color="white"
                unelevated
                rounded
                :options="[
                  {label: 'Hot', value: 'hot'},
                  {label: 'Warm', value: 'warm'},
                ]"
              />
            </div>
          </div>
        </div>
        <div v-if="item.options.length" class="col-12 q-mt-lg">
          <div class="extra">Extra:</div>
          <div
            v-for="(extra, i) in item.extras"
            :key="i"
            class="extra-section"
          >
            <q-toggle
              class="toggle-btn"
              size="60px"
              color="red-5"
              height="150px"
              v-model="extraArr"
              :val="extra.id"
              :label="extra.name"
              right-label
              icon-color="white"
            />
            <div class="extra-price"><strong>+ {{ extra.price + ' ' + $t('valuta') }} </strong></div>
          </div>
        </div>
      </div>

      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn flat text-color="grey-7" size="md" label="Отмена" @click="onCancelClick" />
        <q-btn :disable="isChooseVariant" rounded text-color="white" size="md" class="order-qbtn" label="Добавить в заказ" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
    name: "DialogVariantsExtras",
    emits: ['ok', 'hide'],
    props: {
      item: Object
    },
    data() {
        return {
          extraArr: [],
          sizeModel: ref('m'),
          temprature:ref('hot')
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
        this.$store.dispatch('items/changeOptionValue', [e, this.item, op.id])
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

<style lang="scss">
.toggle-options{
  display: flex;
}
.toggle-btn-inner {
  &:first-child{
    .q-btn-group {
      border-radius: 25px 0 0 25px;
    }
  }
  &:last-child{
    .q-btn-group {
      border-radius: 0 25px 25px 0;
    }
  }
}
.q-dialog-plugin{
  width: 330px;
  border-radius: 15px !important;
}
.name{
  font-size: 20px;
  font-weight: bold;
}
.toggle-btn{
  height: 50px;
  padding: 0px;
}
.extra{
  font-size: 20px;
  font-weight: bold;
}
.extra-section{
  margin-left: -19px;
  display: flex;
  justify-content: space-between
}
.extra-price{
  margin-top: 19px;
}
.q-toggle__inner--truthy .q-toggle__track{
  opacity: 1;
}
.order-qbtn{
  background-color: #07C900;
  padding: 10px 20px 10px 20px;
}
.q-toggle__inner{
  width: 1.65em;
}
.q-toggle__track{
  height: 0.50em;
  border-radius: 25px;
} 
.q-toggle__thumb {
    top: 0.35em;
    left: 0.32em;
    width: 0.45em;
    height: 0.45em;
    color:white ;
}
.q-toggle__inner--truthy .q-toggle__thumb {
    left: 0.87em;
}
.q-toggle__label{
  font-weight: bold;
  margin-left: -7px;
  margin-top: 6px;
}
</style>
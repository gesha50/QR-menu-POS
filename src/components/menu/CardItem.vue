<template>
<div class="CardItem q-pa-md">
  <div
    class="CardItem__inside q-ma-sm"
    :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
  >
    <div @click="addItemInCart" class="CardItem__forImg full-width" style="user-select: none;">
      <div v-if="itemInCart" class="CardItem__inCart">
        <div class="CardItem__counter bg-white text-amber-8">{{itemInCart}}</div>
      </div>
        <img
          v-if="item.image"
          :src="`${url}/uploads/restorants/${item.image}_large.jpg`"
          alt=""
          class="CardItem__img full-width"
        >
        <img
          v-else
          :src="require(`../../assets/img/menu-item/default.jpg`)"
          alt=""
          class="CardItem__img full-width"
        >
      </div>
    <div class="CardItem__footer q-px-lg q-py-md">
        <div class="CardItem__title">{{ item.name }}</div>
        <div class="row q-mt-sm">
          <div class="CardItem__isActive column justify-center">
            <i v-if="item.isActive" class="fas fa-check-circle text-green"></i>
            <i v-else class="fas fa-times-circle text-red"></i>
          </div>
          <div class="CardItem__price q-ml-md">$ {{ item.price }}</div>
        </div>
      </div>
  </div>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="row">
        <div class="col-6">
          <div class="q-gutter-sm">
            <div class="">{{item.options[0].name}}: {{optionNameRadio}}</div>
              <div
                v-for="(optionName, ind) in item.options[0].options.split(',')"
                :key="ind"
                class=""
              >
                <input
                  type="radio"
                  :checked="optionName === optionNameRadio"
                  :value="optionName"
                  @change="changeOptions($event, optionName)"
                >
              </div>
            <div class="">{{item.options[1].name}}: {{optionNameRadio2}}</div>
            <div
              v-for="(optionName, ind) in item.options[1].options.split(',')"
              :key="ind"
              class=""
            >
              <input
                type="radio"
                :checked="optionName === optionNameRadio2"
                :value="optionName"
                @change="changeOptions2($event, optionName)"
              >
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
        <q-btn color="green" label="Добавить в заказ" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CardItem",
    props: {
      item: Object
    },
    emits: ['ok', 'hide'],
    data() {
        return {
          extraArr: [],
          optionNameRadio: '',
          optionNameRadio2: '',
        }
    },
    created() {},
    mounted() {
      if (this.item.variants.length) {
        this.item.variants.forEach(variant => {
          // console.log(JSON.parse(variant.options))
        })
      }
    },
    components: {},
    computed: {
      url() {
        return process.env.API
      },
      table_id() {
        return this.$route.path.split('/')[2]
      },
      cart() {
        return this.$store.getters['items/ItemsInCart'](this.table_id)
          ? this.$store.getters['items/ItemsInCart'](this.table_id)
          : []
      },
      itemInCart() {
        let res = 0
        this.cart.forEach(el => {
          if (el.id === this.item.id) {
            res = el.counter
          }
        })
        return res
      }
    },
    methods: {
      changeOptions(e, option) {
        this.optionNameRadio = e.target.value
      },
      changeOptions2(e, option) {
        this.optionNameRadio2 = e.target.value
      },
      addItemInCart() {
        if (this.item.extras.length || this.item.variants.length) {
          this.show()
        } else {
          this.$store.dispatch('items/addItemInCart', [this.item, this.table_id, this.extraArr])
        }
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
        console.log(this.extraArr)
        console.log(this.item.extras)
        if (!this.extraArr.length) {
          this.$store.dispatch('items/addItemInCart', [this.item, this.table_id, this.extraArr])
        } else {
          this.$store.dispatch('items/addItemInCartWithExtra', [this.item, this.table_id, this.extraArr])
        }

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
@import "../../css/var";
.CardItem {
  &__inside {
    border-radius: $borderRadius;
    position: relative;
  }
  &__inCart {
    position: absolute;
    z-index: 1;
    height: 200px;
    width: 100%;
    background: linear-gradient(145deg, transparent, transparent, $amber-8);
  }
  &__counter {
    border-radius: 50%;
    bottom: 10px;
    right: 10px;
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    font-family: 'GSansReg';
  }
  &__title {
    font-family: 'GSansReg';
    font-size: 18px;
    line-height: 1.2;
    font-weight: 500;
  }
  &__forImg {
    cursor: pointer;
    height: 200px;
  }
  &__img {
    border-radius: $borderRadius $borderRadius 0 0;
    height: 100%;
    object-fit: cover;
  }
  &__isActive {
    & i {
      font-size: 17px;
    }
  }
  &__price {
    font-family: 'GSansReg';
    font-size: 17px;
    line-height: 1.2;
    font-weight: 400;
  }
}
</style>

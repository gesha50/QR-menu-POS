<template>
  <div class="root fit relative-position">
    <div class="order-id">
      <h4>Order ID #{{ id }}</h4>
      <div class="flex">
        <p>{{ restaurantName }}</p>
        <p>Dine-In T-34</p>
      </div>
    </div>
    <div class="order-items fit">
      <div
        class=""
        v-for="(item, i) in items"
        :key="i"
      >
      <div class="item">
        <div class="item-name">
          <p>{{i+1}}</p>
          <div class="name">
            <p>{{ item.name }}</p>
            <p v-if="item.pivot.variant_name">{{ '(' + item.pivot.variant_name + ')' }}</p>
          </div>
        </div>
        <div class="row">
          <div v-if="item.pivot.qty>1" class="q-pr-sm">
            {{ item.pivot.qty + ' x ' }}
          </div>
            {{ item.price  + ' ' + $t('valuta') }}
          </div>
        </div>
        <div class="float-right">
          <div class="">{{ JSON.parse(item.pivot.extras)[0] }}</div>
        </div>
      </div>
    </div>
    <div class="order-price absolute-bottom">
      <div class="price-block">
        <div class="flex-item">
          <h5>Grand Total</h5>
          <p>{{ totalPrice + ' ' + $t('valuta') }}</p>
        </div>
      </div>
      <button class="button-print" @click="print()"><img src="~/assets/img/cil_print.svg" alt="print"> Print invice</button>
    </div>
  </div>
  <div class="print" id="print">
    <div class="first">
      <pre style="margin: 0;"><b>Order ID:</b>   #{{ id }}</pre>
      <pre style="margin: 0;"><b>Printed:</b>    {{currentDateTime()}}</pre>
    </div>
    <div class="block">
      <div class="head">
        <pre>Наименование</pre>
        <pre>Итого</pre>
      </div>
      <div class="items-block">
        <div
          class="items-box"
          v-for="(item, i) in items"
          :key="i"
        >
          <div class="item">
            <div class="item-name">
              <p>{{i+1}}</p>
              <div class="name">
                <pre>{{ item.name }}</pre>
                <p v-if="item.pivot.variant_name">{{ '(' + item.pivot.variant_name + ')' }}</p>
              </div>
            </div>
            <div class="row">
              <div v-if="item.pivot.qty>1" class="q-pr-sm">
                <pre>{{ item.pivot.qty + ' x ' }}</pre>
              </div>
              <pre>{{ item.price  + ' ' + $t('valuta') }}</pre>
            </div>
          </div>
          <div class="float-right">
            <div class="">{{ JSON.parse(item.pivot.extras)[0] }}</div>
          </div>
        </div>
      </div>
      <div class="price-main">
        <pre><b>Итого:</b></pre>
        <hr>
        <pre>{{totalPrice + ' ' + $t('valuta') }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import printJS from 'print-js';
export default {
  props: ['id', 'restaurantName', 'totalPrice', 'items'],
  computed: {
    archive() {
      return this.$store.getters['archive/archive']
    }
  },
  methods: {
    print() {
       printJS({
        printable: 'print',
        type: 'html',
        targetStyles: ['*'],
      });
    },
    currentDateTime() {
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;
      
      return dateTime;
    }
  }
}
</script>

<style lang="scss" scoped>
  .print {
    width: 300px;
    display: block;
    .first {
      padding: 0 5px 5px;
    }
    .block {
      border-top: 1px dashed #101010;
      border-bottom: 1px solid #101010;
      padding: 5px 0;
      .head {
        padding:0 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        pre {
          margin: 0;
        }
      }
      .items-block {
        margin-top: 5px;
        margin-bottom: 30px;
        .item {
          width: 100%;
          padding: 5px;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          border-top: 0.5px solid #101010;
          p {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 100%;
            margin: 0;
            font-feature-settings: 'pnum' on, 'lnum' on;
            color: #1E1E1E;
          }
          .item-name {
            display: flex;
            .name {
              margin-left: 8px;
              pre {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 100%;
                margin: 0;
                font-feature-settings: 'pnum' on, 'lnum' on;
                color: #1E1E1E;
              }
              span {
                font-style: normal;
                font-weight: normal;
                font-size: 10px;
                line-height: 100%;
                margin: 0;
                font-feature-settings: 'pnum' on, 'lnum' on;
                color: #1E1E1E;
              }
            }
          }
          .row {
            pre {
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 100%;
              margin: 0;
              font-feature-settings: 'pnum' on, 'lnum' on;
              color: #1E1E1E;
            }
          }
        }
      }
      .price-main {
        padding:0 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .root {
    .order-id {
      padding: 0 10px 15px;
      border-bottom: 1px solid #cccccc;
      h4 {
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        line-height: 130%;
        margin: 0 0 5px;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: #1E1E1E;
      }
      .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          line-height: 130%;
          margin: 0;
          font-feature-settings: 'pnum' on, 'lnum' on;
          color: #1E1E1E;
        }
      }
    }
    .order-items {
      padding: 0 10px;
      position: relative;
      .item {
        width: 100%;
        padding: 10px 5px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:nth-child(even) {
          background: rgba(0, 0, 0, 0.07);
        }
        &:nth-child(odd) {
          background: #ffffff;
        }
        .item-name {
          display: flex;
          p {
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 100%;
            margin: 0;
            font-feature-settings: 'pnum' on, 'lnum' on;
            color: #1E1E1E;
          }
          .name {
            margin-left: 8px;
            p {
              font-style: normal;
              font-weight: 600;
              font-size: 15px;
              line-height: 100%;
              margin: 0;
              font-feature-settings: 'pnum' on, 'lnum' on;
              color: #1E1E1E;
            }
            span {
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 100%;
              margin: 0;
              font-feature-settings: 'pnum' on, 'lnum' on;
              color: #1E1E1E;
            }
          }
        }
        p {
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 130%;
          margin: 0;
          font-feature-settings: 'pnum' on, 'lnum' on;
          color: #1E1E1E;
        }
      }
    }
    .order-price {
      padding: 10px 10px 5px;
      background:rgba(0, 0, 0, 0.09);
      .price-block {
        margin-bottom: 15px;
        .flex-item {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          justify-content: space-between;
          h5 {
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 130%;
            margin: 0;
            font-feature-settings: 'pnum' on, 'lnum' on;
            color: #1E1E1E;
          }
          p {
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 130%;
            margin: 0;
            font-feature-settings: 'pnum' on, 'lnum' on;
            color: #1E1E1E;
          }
        }
      }
      .button-print {
        width: 100%;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        display: flex;
        align-items: center;
        font-style: normal;
        justify-content:center;
        font-weight: normal;
        font-size: 13px;
        line-height: 130%;
        margin: 0;
        padding: 10px 0;
        background:#08C804;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: #ffffff;
        outline: none;
        img {
          margin-right: 5px;
        }
      }
    }
  }
</style>

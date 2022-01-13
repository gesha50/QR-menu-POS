<template>
  <div class="root fit relative-position" id="print">
      <div class="order-id">
        <h4>Order ID #87687</h4>
        <div class="flex">
          <p>Vincet Lobo</p>
          <p>Dine-In T-34</p>
        </div>
      </div>
      <div class="order-items fit">
        <div class="item">
          <div class="item-name">
            <p>1</p>
            <div class="name">
              <p>Sofi osh</p>
              <span>Medium-Half Grilled</span>
            </div>
          </div>
          <p>38,000 sum</p>
        </div>
        <div class="item">
          <div class="item-name">
            <p>2</p>
            <div class="name">
              <p>Sofi osh</p>
              <span>Medium-Half Grilled</span>
            </div>
          </div>
          <p>38,000 sum</p>
        </div>
        <div class="item">
          <div class="item-name">
            <p>3</p>
            <div class="name">
              <p>Sofi osh</p>
              <span>Medium-Half Grilled</span>
            </div>
          </div>
          <p>38,000 sum</p>
        </div>
      </div>
      <div class="order-price absolute-bottom">
        <div class="price-block">
          <div class="flex-item">
            <h5>Grand Total</h5>
            <p>38,000 sum</p>
          </div>
        </div>
        <button class="button-print" onclick="print()"><img src="~/assets/img/cil_print.svg" alt="print"> Print invice</button>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    archive() {
      return this.$store.getters['archive/archive']
    }
  },
  methods: {
    print() {
       Printjs({
         printable: "print", //Id to print content 
         type: "HTML"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
        &:nth-child( even) {
          background: rgba(0, 0, 0, 0.07);
        }
        &:nth-child(odd) {
          background: #ffffff;
        }
        .item-name {
          display: flex;
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
        img {
          margin-right: 5px;
        }
      }
    }
  }
</style>
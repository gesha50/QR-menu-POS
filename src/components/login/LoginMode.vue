<template>
<div class="LoginMode">
  <div class="q-gutter-sm flex justify-center">
    <div class="text-center">
      <div class="white">
        <q-btn-toggle
          v-model="isRestaurant"
          toggle-color="red-6"
          rounded
          color="white"
          text-color="black"
          :options="[
              {label: this.$t('login.mode.individual'),  value: false},
              {label: this.$t('login.mode.restaurant'), value: true},
            ]"
        />
      </div>
    </div>
  </div>
  <div class="column justify-center">
    <div class="q-pa-md LoginPage">
      <div v-if='isRestaurant === "Choose mode"'>
        {{$t('login.mode.choose_mode')}}
      </div>
      <div v-else-if="isRestaurant">
        <login-restaurant />
      </div>
      <div v-else>
        <login-individual />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import LoginRestaurant from "components/login/LoginRestaurant";
import LoginIndividual from "components/login/LoginIndividual";

export default defineComponent({
    name: "LoginMode",
    data() {
        return {
          isRestaurant: this.$store.getters['settings/getIsRestaurant'],
        }
    },
    created() {
      let isRestaurant = this.$q.localStorage.getItem('isRestaurant')
      if (typeof isRestaurant == "boolean") {
        this.isRestaurant = isRestaurant
      }
    },
    mounted() {},
    components: {
      LoginRestaurant,
      LoginIndividual
    },
    computed: {},
    methods: {},
})
</script>

<style lang="scss" >
.white {
  background-color: #ffffff;
  border-radius: 25px;
  padding: 3px;
  margin: 10px 0 30px;
}
.q-btn-group {
  box-shadow: none;
  .q-btn-item {
    background-color: #000;
  }
}
.LoginPage {
  text-align: center;
  &__form {
    width: 400px;
    margin: 0 auto 100px;
    .input-container {
      width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
      label {
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
        margin: 0 0 5px;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: #1E1E1E;
      }
    }
    .login-button {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #08C804;
      border: none;
      padding: 25px 0;
      border-radius: 0px 0px 30px 30px;
      font-family: 'Raleway',sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 26px;
      line-height: 120%;
      font-feature-settings: 'pnum' on, 'lnum' on;
      cursor: pointer;
      color: #FAFAFA;
    }
  }
}

@media (max-width: 1040px) {
  .LoginPage {
    width: 100%;
    &__form {
      width: 100%;
    }
  }
}
@media (max-width: 990px) {

}
@media (max-width: 770px) {

}
@media (max-width: 580px) {

}
@media (max-width: 500px) {
  .white {
    margin: 15px 0 25px;
  }
  .LoginPage {
    padding:0;
    &__form {
      margin: 0 auto 80px;
      .input-container {
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .login-button {
        padding: 15px 0;
        font-size:22px
      }
    }
  }
}
</style>

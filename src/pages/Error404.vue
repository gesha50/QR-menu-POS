<template>
  <q-page>
    <div class="container q-pt-lg">
      <div class="logo q-mb-lg">
        <q-img src="../assets/img/logo_login.svg"></q-img>
      </div>
      <div class="q-pa-md q-mt-lg text-h1 text-weight-bold text-center text-negative">
        404
      </div>

      <div class="message q-mt-md">
        <p>Страница не найдена</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
<style lang="scss">
.container{
  width: 100%;
  height: calc(100vh - 58px);
  margin: 0 auto;
  background-color: #fff;
  .logo{
    width: 85px;
    margin: 0 auto;
  }
  .message{
    text-align: center;
    font-weight: bold;
    font-size: 19px;
    color: #1E1E1E;
  }
}
</style>

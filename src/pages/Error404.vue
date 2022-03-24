<template>
  <q-page>
    <div class="relative q-pt-lg">
      <div class="absolute-center">
        <div class="bg-reds">
          <div class="icon">
            <img src="../assets/img/error.png" alt="error">
          </div>
          <h3>Страница не найдена</h3>
          <p>Извините! Контент, который вы ищете, не существует. Либо удалили, либо ссылку опечатали.</p>
          <a class="btn-back q-py-md q-px-lg" href="/"><span class="material-icons">arrow_back</span> Возвращаться</a>
        </div>
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
<style lang="scss" scoped>
  .bg-reds {
    width: 620px;
    background: rgba(237, 80, 79, 0.1);
    border-radius: 50%;
    padding: 100px 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    .icon {
      width: 70%;
      height: auto;
      margin: 0 auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: 44px;
      line-height: 130%;
      text-align: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      margin: 30px 0 0;
      color: #1B1B1B;
    }
    p {
      width: 90%;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 130%;
      text-align: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      margin: 20px auto 30px;
      color: #1B1B1B;
    }
    .btn-back {
      width: 50%;
      background: #08C804;
      border-radius: 24px;
      display: inline-block;
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 150%;
      text-align: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      margin: 0 auto;
      text-decoration: none;
      color: #FAFAFA;
    }
  }
  @media (max-width: 1381px) {
    .bg-reds {
      width: 520px;
      padding: 70px 30px;
      .icon {
        width: 70%;
      }
      h3 {
        font-size: 34px;
        margin: 30px 0 0;
      }
      p {
        width: 90%;
        font-size: 15px;
        line-height: 130%;
        margin: 20px auto 30px;
      }
      .btn-back {
        width: 60%;
        font-size: 20px;
        line-height: 150%;
      }
    }
  }
  @media (max-width: 540px) {
    .bg-reds {
      width: 320px;
      padding: 30px 20px;
      .icon {
        width: 50%;
      }
      h3 {
        font-size: 24px;
        margin: 30px 0 0;
      }
      p {
        width: 90%;
        font-size: 13px;
        line-height: 130%;
        margin: 10px auto 20px;
      }
      .btn-back {
        width: 60%;
        font-size: 15px;
        line-height: 150%;
        padding: 10px 20px;
        border-radius: 12px;
      }
    }
  }
</style>

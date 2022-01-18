<template>
<q-page>
  <div class="column justify-evenly items-center">
    <img
      width="150"
      height="150"
      class="logo q-mt-md"
      src="../assets/img/logo_login.svg"
      alt="logo"
    >

    <div class="bg relative-position">
      <login-mode />
    </div>

  </div>
</q-page>
</template>

<script>

import LoginMode from "components/login/LoginMode";

export default {
  name: "Login",
  components: {
    LoginMode,
  },
  methods: {

  }
}
</script>

<style lang="scss">
.q-page {
  .bg {
    width: 700px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    padding: 70px 70px 0 70px;
  }
}

@media (max-width: 1040px) {
  .q-page {
    .bg {
      width: 500px;
    }
  }
}
@media (max-width: 990px) {
  .q-page {
    .bg {
      width: 450px;
    }
  }
}
@media (max-width: 770px) {
  .q-page {
    .bg {
      width: 400px;
      padding: 50px 40px 0 40px;
    }
  }
}
@media (max-width: 580px) {
  .q-page {
    .bg {
      width: 350px;
      padding: 50px 40px 0 40px;
    }
  }
}
@media (max-width: 500px) {
  .q-page {
    .bg {
      width: 300px;
      padding: 30px 20px 0 20px;
    }
  }
}
</style>

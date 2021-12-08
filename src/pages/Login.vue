<template>
<q-page class="column justify-center">
  <div class="q-pa-md flex justify-center LoginPage">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md LoginPage__form"
    >
      <q-input
        autofocus
        filled
        type="number"
        v-model="password"
        label="password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please write password',
          val => val >= 0 && val <= 9999 || 'Please enter 4 numbers',
          val => val.length === 4 || 'Please enter 4 numbers'
        ]"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</q-page>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      password: null
    }
  },
  methods: {
    onSubmit () {
      if (this.password === '1234') {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
        this.$store.dispatch('settings/userAuth', true)
        this.$router.push('/')
      }
      else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'It`s not correct password'
        })
      }
    },
    onReset () {
      this.password = null
    }
  }
}
</script>

<style scoped lang="scss">
.LoginPage {
  &__form {
    width: 300px;
  }
}
.marginAuto {
  margin: auto;
}
</style>

<template>
  <q-page id="registrationPage">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Register</q-toolbar-title>
    </q-toolbar>

    <q-scrool-are class="form-style">
      <div class="text-h6 text-center q-mt-md">
        <q-img src="/favicon.ico" height="60px" width="60px" />
        <div>Ev Charge Map</div>
      </div>

      <q-form class="q-pa-md q-gutter-y-md" @submit.prevent="handleRegister">
        <div class="text-center">Register and get extra features!</div>

        <q-input v-model="data.form.firstName" outlined stack-label label="First Name" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

        <q-input v-model="data.form.lastName" outlined stack-label label="Last Name" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Last Name is required']" />

        <q-input v-model="data.form.email" type="email" outlined stack-label label="Email" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']" />

        <q-input v-model="data.form.password" type="password" outlined stack-label label="Password" lazy-rules :rules="[
          (val) => (val && val.length > 0) || 'Password is required',
          (val) =>
            (val && val.length >= 6) ||
            'Password should be at least 6 characters',
        ]" />

        <q-input v-model="data.form.confirmPassword" type="password" outlined stack-label label="Confirm Password"
          lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Password is required',
            (val) =>
              (val && val.length >= 6) ||
              'Password should be at least 6 characters',
          ]" />

        <q-btn :loading="data.loading" label="Register" color="black" class="full-width" size="lg" type="submit">
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Registering...
          </template>
        </q-btn>
      </q-form>
    </q-scrool-are>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'RegisterSectionPage',
  setup () {
    const data = reactive({
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    })

    const handleRegister = async () => {
      data.loading = true
    }

    return {
      data,
      handleRegister
    }
  }
})
</script>

<style lang='scss'>
#registrationPage {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 180px);
    max-width: 500px;
  }
}
</style>

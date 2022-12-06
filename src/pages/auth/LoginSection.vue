<template>
  <q-page id="LoginPage">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Login</q-toolbar-title>
    </q-toolbar>

    <q-scroll-area class="form-style">
      <div class="text-h6 text-center q-mt-md">
        <q-img src="/favicon.ico" height="60px" width="60px" />
        <div>Ev Charge Map</div>
      </div>

      <q-form class="q-pa-md q-gutter-y-md"  @submit.prevent="handleLogin">
        <q-input v-model="data.form.email" type="email" outlined stack-label label="Email" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']" />

        <q-input v-model="data.form.password" type="password" outlined stack-label label="Password" lazy-rules :rules="[
          (val) => (val && val.length > 0) || 'Password is required',
          (val) =>
            (val && val.length >= 8) ||
            'Password should be at least 8 characters',
        ]" />

        <q-btn :loading="data.loading" label="Login" color="black" class="full-width" size="lg" type="submit">
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Logging in...
          </template>
        </q-btn>

        <div class="q-px-md q-mt-xl text-center">
          <div class="q-mb-md no-account">Don't have an account?</div>
          <q-btn label="Register Here" color="teal" outline rounded to="/auth/register" size="15px" />
        </div>
      </q-form>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { useRouteStore } from 'src/stores/route-store'
import useNotify from 'src/composables/useNotify'

export default defineComponent({
  name: 'LoginSectionPage',
  setup () {
    const userStore = useUserStore()
    const router = useRouter()
    const routeStore = useRouteStore()
    const { notifyError, notifySuccess } = useNotify()

    const handleLogin = async () => {
      data.loading = true

      try {
        await userStore.getSanctumCookie()
        await userStore.login(data.form.email, data.form.password)
        const user = await userStore.fetchUser()
        userStore.setUser(user)

        await routeStore.showAllSavedRoutesByUserId()

        notifySuccess('Welcome back, ' + userStore.getFirstName + '!')
        router.push('/route')
      } catch (error) {
        notifyError('Your login was unsuccessful. Please make sure that your details are correct.')
      } finally {
        data.loading = false
      }
    }

    const data = reactive({
      loading: false,
      form: {
        email: '',
        password: ''
      }
    })

    return {
      data,
      handleLogin
    }
  }
})
</script>

<style lang='scss'>
#LoginPage {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 180px);
    max-width: 500px;
  }

  .no-account {
    font-size: 17px;
  }
}
</style>

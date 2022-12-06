<template>
  <q-page id="accountMenu">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Account</q-toolbar-title>
    </q-toolbar>

    <div v-if="useStore.getUser.email" class="text-h6 text-center q-pa-xl">
      <q-avatar size="60px" color="green">{{ useStore.getFirstLettersOfName }}</q-avatar>
      <div>{{ useStore.getFirstName }}  {{ useStore.getLastName }}</div>
    </div>

    <div class="menu">
      <q-separator inset />
      <q-list class="q-mx-md" bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded color="primary" text-color="white" icon="account_box" />
          </q-item-section>

          <q-item-section  @click="goToMyDetail" class="text-size">My Details</q-item-section>

          <q-item-section side>
            <q-icon name="arrow_right" size="35px" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator inset />

      <q-list class="q-mx-md" bordered>
        <q-item clickable v-ripple @click="handleLogout">
          <q-item-section avatar>
            <q-avatar rounded color="red" text-color="white" icon="logout" />
          </q-item-section>

          <q-item-section  class="text-size">Logout</q-item-section>

          <q-item-section side>
            <q-icon name="arrow_right" size="35px" />
          </q-item-section>
        </q-item>
      </q-list>

    </div>

  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user-store'
import { useRouteStore } from 'src/stores/route-store'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AccountMenuPage',
  setup () {
    const router = useRouter()
    const useStore = useUserStore()
    const routeStore = useRouteStore()
    const $q = useQuasar()

    const goToMyDetail = () => {
      router.push('/account/my-details')
    }

    const handleLogin = async () => {
      data.loading = true
    }

    const handleLogout = () => {
      const response = $q.dialog({
        title: 'Logout!',
        message: 'Are you sure you want to logout?',
        cancel: true,
        persistent: true
      })

      response.onOk(async () => {
        try {
          await useStore.logout()
          useStore.clearUser()
          routeStore.clearRoute()

          router.push('/map')
        } catch (error) {

        }
      })
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
      handleLogin,
      handleLogout,
      goToMyDetail,
      useStore
    }
  }
})
</script>

<style lang='scss'>
#accountMenu {
  .menu {
    margin: 0 auto;
    max-width: 500px;
  }

  .text-size {
    font-size: 18px
  }
}
</style>

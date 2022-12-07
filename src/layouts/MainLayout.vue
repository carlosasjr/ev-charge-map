<template>
  <q-layout>
    <q-header class="bg-teal">
      <q-toolbar>
        <q-img src="/favicon.ico" height="40px" width="40px" />
        <q-toolbar-title> Ev Charge Map </q-toolbar-title>

        <q-btn v-if="userStore.getUser.email" to="/account" flat round dense icon="account_circle" />
        <q-btn v-else to="/auth" flat round dense icon="login" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :width="250">
      <q-scroll-area id="menu-section">
        <q-list padding>
          <q-item clickable v-ripple to="/map">
            <q-item-section avatar>
              <q-icon name="explore" />
            </q-item-section>
            <q-item-section> Map </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/route">
            <q-item-section avatar>
              <q-icon name="directions" />
            </q-item-section>

            <q-item-section> Routes </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/route/saved-routes">
            <q-item-section avatar>
              <q-icon name="favoritess" />
            </q-item-section>

            <q-item-section> Favorites </q-item-section>
          </q-item>

          <q-item v-if="!userStore.getUser.email" clickable v-ripple to="/auth">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section> Login </q-item-section>
          </q-item>

          <q-item v-if="userStore.getUser.email" clickable v-ripple to="/account">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section> Account </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-if="!pwaIsInstalled" @click="handleInstallApp">
            <q-item-section avatar>
              <q-icon name="install_mobile" />
            </q-item-section>

            <q-item-section> Install PWA </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

      <div class="bg-dark text-white q-pa-md absolute-top area-height">
        <q-item-section avatar class="row">
          <div v-if="userStore.getUser.email">
            <q-icon size="20px" name="verified_user" />
            <span class="q-pl-sm">{{ userStore.getUser.first_name }} {{ userStore.getUser.last_name }}</span>
          </div>
          <div v-else>
            <q-icon size="20px" name="do_not_disturb" />
            <span class="q-pl-sm">No user logged in</span>
          </div>
        </q-item-section>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-tabs class="text-light bg-teal">
        <q-route-tab to="/map" name="/map" icon="explore" label="Map" />
        <q-route-tab to="/route" name="/route" icon="directions" label="Routes" />
        <q-route-tab to="/route/saved-routes" name="/favorites" icon="favorites" label="Favorites" />
        <q-route-tab v-if="userStore.getUser.email" to="/account" name="/account" icon="account_circle"
          label="Account" />
        <q-route-tab v-if="!userStore.getUser.email" to="/auth" name="/auth" icon="login" label="Auth" />
        <q-route-tab v-if="!pwaIsInstalled" @click="handleInstallApp" name="install" icon="install_mobile"
          label="Install" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useUserStore } from 'stores/user-store'

export default defineComponent({
  setup () {
    const userStore = useUserStore()
    const deferredPrompt = ref(null)
    const leftDrawerOpen = ref(false)

    onMounted(async () => {
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('aqui')
        e.preventDefault()
        deferredPrompt.value = e
      })
    })

    const pwaIsInstalled = computed(() => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('This IS running as standalone.')
        return true
      }
      console.log('This is NOT running as standalone.')
      return false
    })

    const handleInstallApp = async () => {
      deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice
      if (outcome === 'dismissed') {
        console.log(`User response to the install prompt: ${outcome}`)
        deferredPrompt.value = null
        return ''
      }
    }

    return {
      userStore,
      pwaIsInstalled,
      handleInstallApp,
      leftDrawerOpen
    }
  }
})
</script>

<style lang="scss">
.area-height {
  height: 50px;
}

#menu-section {
  height: calc(100% - 50px);
  margin-top: 50px;
  border-right: 1px solid #ddd
}

@media (min-width: $breakpoint-sm-max) {
  #mobile-menu {
    display: none;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .desktop-menu {
    display: none;
  }
}
</style>

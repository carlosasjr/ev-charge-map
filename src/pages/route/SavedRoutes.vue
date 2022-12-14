<template>
  <q-page id="saveRoutes">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Saved Routes</q-toolbar-title>
      <q-btn @click="isLoggedInAddRoute" flat round dense icon="add" size="20px" />
    </q-toolbar>

    <div class="section-title">
      <div class="text-h6 q-mx-sm">Select one of your save routes!</div>
    </div>

    <div v-if="(routeStore.getAllSavedRoutes.length == 0)" class="text-center q-pt-lg">
      <q-btn @click="isLoggedInAddRoute" flat round dense icon="add_circle_outline" size="33px" />
      <div class="text-h6">Add some routes!</div>
      <div class="q-pa-md info">This is where you can add most favorite or common jorneys!</div>
    </div>

    <q-scroll-area class="list" v-else>
      <q-list v-for="(route, index) in routeStore.getAllSavedRoutes" :key="index">
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="green" text-color="white" icon="directions" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ route.name }}</q-item-label>
            <q-item-label caption>
              <div class="q-px-sm">
                <strong>From</strong>: {{ route.from }}
              </div>
              <div class="q-px-sm">
                <strong>To</strong>: {{ route.to }}
              </div>
              <div class="q-px-sm">
                <strong>Search Radius</strong>: {{ route.range }}
              </div>

            </q-item-label>
          </q-item-section>

          <q-item-section side botton>
            <q-btn @click="showSavedRouteOnMap(route)" class="q-ma-sm" color="green" label="Go to map" size="sm" />
            <q-btn @click="deleteSavedRouteOnMap(route)" class="q-mx-sm" color="red" label="Delete" size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>

</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from 'src/stores/route-store'
import { useUserStore } from 'src/stores/user-store'
import useNotify from 'src/composables/useNotify'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'RouteSelectPage',
  setup () {
    const router = useRouter()
    const routeStore = useRouteStore()
    const useStore = useUserStore()
    const { notifyError, notifySuccess } = useNotify()
    const $q = useQuasar()

    onMounted(async () => {

    })

    const isLoggedInAddRoute = () => {
      if (!useStore.getUser.email) {
        const response = $q.dialog({
          title: 'You\'re not logged in!',
          message: 'Login to add and see your saved routes',
          cancel: true,
          persistent: true
        })

        response.onOk(async () => {
          router.push('/auth')
        })

        return
      }

      router.push('/route/add-route')
    }

    const showSavedRouteOnMap = (route) => {
      routeStore.setRoute(route)

      router.push('/map')
    }

    const deleteSavedRouteOnMap = async (route) => {
      const dialogRes = $q.dialog({
        title: `Delete Route "${route.name}"`,
        message: 'Are you sure you want to delete this route?',
        cancel: true,
        persistent: true
      })

      dialogRes.onOk(async () => {
        try {
          await routeStore.delete(route)

          await routeStore.showAllSavedRoutesByUserId()

          notifySuccess('Route deleted succesfully')
        } catch (error) {
          notifyError(error.message)
        }
      })
    }

    return {
      isLoggedInAddRoute,
      showSavedRouteOnMap,
      deleteSavedRouteOnMap,
      routeStore
    }
  }
})
</script>

<style lang='scss'>
#saveRoutes {
  .section-title {
    padding: 12px 10px 8px 10px;
    max-width: 500px;
    margin: 0 auto;
  }

  .info {
    font-size: 16px
  }

  .list {
    margin: 0 auto;
    height: calc(100vh - 250px);
    max-width: 500px;
  }
}
</style>

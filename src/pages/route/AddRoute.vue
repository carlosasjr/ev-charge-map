<template>
  <q-page id="addRoute">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Add Route</q-toolbar-title>
      <q-btn to="/route/saved-routes" flat round dense icon="favorites" color="red" />
    </q-toolbar>

    <q-scroll-area class="q-pa-md form-style q-gutter-sm">
      <div class="text-h6 q-pb-md">
        Save your favorite routes!
      </div>
      <span class="text-body1 q-pd-md">Pick a name for this route</span>

      <q-input v-model="data.form.name" outlined stack-label label="Name" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please enter a name for this route']">
        <template v-slot:append>
          <q-icon name="close" />
        </template>
      </q-input>

      <div class="text-body1 q-pt-md">
        Save your favorite routes!
      </div>

      <q-input v-model="data.form.from" @click="setAddress('From')" outlined stack-label label="From" readonly tabindex="-1"
        lazy-rules :rules="[(val) => (val && val.length > 0) || 'Please enter a from location']">
        <template v-slot:append>
          <q-icon name="close" />
        </template>
      </q-input>

      <q-input v-model="data.form.to" @click="setAddress('To')" outlined stack-label label="To" readonly tabindex="-1" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please enter a to location']">
        <template v-slot:append>
          <q-icon name="close" />
        </template>
      </q-input>

      <div>
        <q-btn @click="handleSave" size="lg" class="full-width" color="black" label="Save Route" />
      </div>
    </q-scroll-area>

    <InputAutocomplete :label="data.label" v-if="data.show" @address="getAddress($event)"
      @input-visible="data.show = $event" />
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import InputAutocomplete from 'src/components/routePage/InputAutocomplete.vue'
import { useRouteStore } from 'src/stores/route-store'
import { useUserStore } from 'src/stores/user-store'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'

export default defineComponent({
  name: 'AddRoutePage',
  components: { InputAutocomplete },
  setup () {
    const router = useRouter()
    const routeStore = useRouteStore()
    const userStore = useUserStore()
    const { notifyError } = useNotify()

    const data = reactive({
      show: false,
      label: '',
      range: '1',
      form: {
        name: '',
        from: '',
        to: ''
      }
    })

    const setAddress = (newLabel) => {
      data.label = newLabel
      data.show = !data.show
    }

    const getAddress = (event) => {
      const selectedLabel = event.label

      if (selectedLabel === 'From') {
        data.form.from = event.description
      }

      if (selectedLabel === 'To') {
        data.form.to = event.description
      }
    }

    const handleSave = async () => {
      try {
        const route = {
          ...data.form,
          user_id: userStore.getUser.id,
          range: data.range
        }

        await routeStore.store(route)

        router.push('/route/saved-routes')
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      data,
      getAddress,
      setAddress,
      handleSave
    }
  }
})
</script>

<style lang='scss'>
#addRoute {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 180px);
    max-width: 500px;
  }
}
</style>

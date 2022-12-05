<template>
  <q-page id="routeSelect">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Route</q-toolbar-title>
      <q-btn to="/route/saved-routes" flat round dense icon="favorites" color="red" />
    </q-toolbar>

    <q-form @submit.prevent="handleSearch" class="form-style q-pa-md q-gutter-md">
      <div class="text-h6 q-pb-md">
        Where would you like to go?
      </div>

      <q-input v-model="data.form.from" @click="setAddress('From')" outlined stack-label label="From" readonly
        tabindex="-1" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Please enter a from location']">
        <template v-slot:append>
          <q-icon name="close" @click="data.form.from = ''" />
        </template>
      </q-input>

      <q-input v-model="data.form.to" @click="setAddress('To')" outlined stack-label label="To" readonly tabindex="-1"
        lazy-rules :rules="[(val) => (val && val.length > 0) || 'Please enter a to location']">
        <template v-slot:append>
          <q-icon name="close" @click="data.form.to = ''" />
        </template>
      </q-input>

      <div>
        <q-btn type="submit" size="lg" class="full-width" color="black" label="Search" />
      </div>
    </q-form>

    <InputAutocomplete :label="data.label" v-if="data.show" @address="getAddress($event)"
      @input-visible="data.show = $event" />

  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import InputAutocomplete from 'src/components/routePage/InputAutocomplete.vue'
import { useRouteStore } from 'src/stores/route-store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RouteSelectPage',
  setup () {
    const routeStore = useRouteStore()
    const route = useRouter()

    const data = reactive({
      show: false,
      label: '',
      form: {
        from: '',
        to: '',
        range: '2'
      }
    })

    const getAddress = (event) => {
      const selectedLabel = event.label

      if (selectedLabel === 'From') {
        data.form.from = event.description
      }

      if (selectedLabel === 'To') {
        data.form.to = event.description
      }
    }

    const setAddress = (newLabel) => {
      data.label = newLabel
      data.show = !data.show
    }

    const handleSearch = () => {
      routeStore.setRoute(data.form)

      route.push('/map')
    }

    return {
      data,
      getAddress,
      setAddress,
      handleSearch
    }
  },
  components: { InputAutocomplete }
})
</script>

<style lang='scss'>
#routeSelect {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 180px);
    max-width: 500px;
  }
}
</style>

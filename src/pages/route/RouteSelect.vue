<template>
  <q-page id="routeSelect">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>Route</q-toolbar-title>
      <q-btn to="/route/saved-routes" flat round dense icon="favorites" color="red" />
    </q-toolbar>

    <div class="form-style q-pa-md q-gutter-md">
      <div class="text-h6 q-pb-md">
        Where would you like to go?
      </div>

      <q-input @click="setAddress('From')" outlined stack-label label="From">
        <template v-slot:append>
          <q-icon name="close" />
        </template>
      </q-input>

      <q-input @click="setAddress('To')" outlined stack-label label="To">
        <template v-slot:append>
          <q-icon name="close" />
        </template>
      </q-input>

      <div>
        <q-btn size="lg" class="full-width" color="black" label="Search" />
      </div>
    </div>

    <InputAutocomplete
      :label="data.label"
      v-if="data.show"
      @address="getAddress($event)"
      @input-visible="data.show = $event "

      />

  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import InputAutocomplete from 'src/components/routePage/InputAutocomplete.vue'

export default defineComponent({
  name: 'RouteSelectPage',
  setup () {
    const data = reactive({
      show: false,
      label: ''
    })

    const getAddress = (event) => {
      console.log(event)
    }

    const setAddress = (newLabel) => {
      data.label = newLabel
      data.show = !data.show
    }

    return {
      data,
      getAddress,
      setAddress
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

<template>
  <q-page id="inputAutocomplete">
    <div class="head">
      <q-input v-model="data.input" debounce="500" :label="label" class="input" outlined autofocus color="white"
        bg-color="white" label-color="black">
        <template v-slot:append>
          <q-icon @click="emit('input-visible', false)"  name="close" />
        </template>
      </q-input>
    </div>

    <div class="addresses">
      <div v-for="addr in data.addresses" :key="addr.place_id">
        <q-list bordered separator>

          <q-item clickable v-ripple
          @click="getAdderss(label, addr.description)"
          >
            <q-item-section>
              <q-item-label>{{ addr.description }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, reactive, watch } from 'vue'
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'InputAutoComplete',

  props: {
    label: {
      type: String,
      default: ''
    }
  },

  setup (props, { emit }) {
    const data = reactive({
      input: '',
      addresses: []
    })

    const handleGetPlaces = async (input) => {
      try {
        if (input) {
          // await useStore.getSanctumCookie()
          const response = await api.post('/api/places', { input })
          data.addresses = response.data.places.predictions
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getAdderss = (label, description) => {
      const adderssDetails = { label, description }

      emit('address', adderssDetails)
      emit('input-visible', false)
    }

    watch(() => data.input, handleGetPlaces)

    return {
      data,
      emit,
      getAdderss
    }
  }
})

</script>

<style lang="scss">
#inputAutocomplete {
  position: absolute;
  width: 100%;
  background-color: white;
  top: 0;
  left: 0;

  .head {
    position: absolute;
    width: 100%;
    height: 95px;
    background-color: $teal-9;
    top: 0;
    left: 0;
    padding: 20px 15px;
  }

  .input {
    max-width: 500px;
    margin: 0 auto;
  }

  .addresses {
    max-width: 500px;
    margin: 0 auto;
    margin-top: 90px;
    overflow-y: auto;
    font-size: 18px;
    padding: 15px;
  }
}
</style>

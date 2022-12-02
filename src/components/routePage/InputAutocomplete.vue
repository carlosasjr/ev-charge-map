<template>
  <q-page id="inputAutocomplete">
    <div class="head">
      <q-input @update:model-value="handleGetPlaces"
               :label="label"
               debounce="400"
               class="input"
               outlined
               autofocus
               color="white"
               bg-color="white"
               label-color="black">
        <template>
          <q-icon name="close" />
        </template>
      </q-input>
    </div>

    <div class="addresses">
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Single line item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label>Item with caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import { api } from 'src/boot/axios'
import { useUserStore } from 'stores/user-store'

export default defineComponent({
  name: 'InputAutoComplete',

  props: {
    label: {
      type: String,
      default: ''
    }
  },

  setup () {
    const useStore = useUserStore()

    const handleGetPlaces = async (input) => {
      try {
        if (input) {
          await useStore.getSanctumCookie()
          const res = await api.post('/api/places', { input })
          console.log(res)
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      handleGetPlaces
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

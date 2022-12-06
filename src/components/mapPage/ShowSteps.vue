<template>
  <q-dialog id="showSteps" v-model="showStepsComputed" persistent :maximized="true" transition-show="slide-down"
    transition-hide="slide-up">
    <q-card class="text-white bg-teal-8">
      <q-toolbar class="bg-teal">
        <q-icon name="directions_car" dense size="40px" color="yellow" />
        <q-toolbar-title>Show Route</q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-toolbar>

      <div class="q-pa-md go-btn">
        <q-btn
        :href="mapLink()"
        target="_blanck"
        :disable="from === ''"
        color="black"
        class="full-width"
        label="Let's go" />
      </div>

      <q-scroll-area class="q-pt-sm main">
        <q-list>
          <q-separator spaced inset />
          <q-item>

            <q-item-section>
              <q-item-label class="text-h6 q-pl-sm">Starting Point</q-item-label>
              <q-item-label caption class="q-pa-sm text-white t-size">{{ from }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-icon name="room" color="red" size="40px" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <div v-if="(via.length > 0)">
            <div v-for="(v, index) in via" :key="index">
              <q-item>
                <q-item-section class="q-ml-sm">
                  <q-item-label class="text-h6">Charge Point {{ ++index }}</q-item-label>
                  <q-item-label class="text-white t-size">{{ v[2] }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-img src="mapIcons/charger.png"/>
                  <q-icon  size="40px" />
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
            </div>
          </div>

          <div v-else>
            <q-item>
              <q-item-section class="text-center">
                <div class="text-h6 text-red-4">You have no charge points!</div>
                Add a charge point to your route!
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
          </div>

          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 q-pl-sm">Destination</q-item-label>
              <q-item-label caption class="q-pa-sm text-white t-size">{{ to }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-icon name="sports_score" color="white" size="40px" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

        </q-list>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    showSteps: {
      type: Boolean,
      required: true
    },

    from: {
      type: String
    },

    to: {
      type: String
    },

    via: {
      type: Array
    }
  },

  setup (props, { emit }) {
    const showStepsComputed = computed({
      get: () => props.showSteps,
      set: (val) => emit('update:showSteps', false)
    })

    const mapLink = () => {
      const fromSection = 'https://www.google.com/maps/dir/?api=1&origin=' + props.from
      const toSection = '&destination=' + props.to + '&travelmode=driving'
      let viaSection = '&waypoints='

      for (let i = 0; i < props.via.length; i++) {
        viaSection += props.via[i][2] + '|'
      }

      return fromSection + toSection + viaSection
    }

    return {
      showStepsComputed,
      mapLink
    }
  }
})
</script>

<style lang="scss">
#showSteps {
  .card-bg-color {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .main {
    height: calc(100vh - 175px);
    margin-top: 30px;
    max-width: 500px;
    margin: 0 auto;
  }

  .go-btn {
    padding-top: 30px;
    max-width: 400px;
    margin: 0 auto;
  }

  .t-size {
    font-size: 16px
  }
}
</style>

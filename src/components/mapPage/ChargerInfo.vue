<template>
  <q-dialog id="chargeInfo" v-model="dialogComputed" persistent :maximized="true" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="card-bg-color text-white">
      <q-toolbar class="bg-teal-9">
        <q-icon name="ev_station" dense size="40px" color="yellow" />
        <q-toolbar-title>Charge Info</q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-scroll-area class="main">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 q-pl-sm">Charger Location</q-item-label>
              <q-item-label caption class="q-pa-sm">
                <div v-if="clickedLocation[2].Title" class="addressSection">
                  {{ clickedLocation[2].Title }}
                </div>

                <div v-if="clickedLocation[2].AddressLine1" class="addressSection">
                  {{ clickedLocation[2].AddressLine1 }}
                </div>

                <div v-if="clickedLocation[2].Town" class="addressSection">
                  {{ clickedLocation[2].Town }}
                </div>

                <div v-if="clickedLocation[2].ToPostcodewn" class="addressSection">
                  {{ clickedLocation[2].Postcode }}
                </div>
              </q-item-label>

              <div class="row items-center status">
                <q-icon name="power" size="35px" />
                <div :class="{
                  isAvailableClass: clickedLocation[3][0].StatusType.IsOperational,
                  isNotAvailableClass: !clickedLocation[3][0].StatusType.IsOperational,
                }">
                  {{ clickedLocation[3][0].StatusType.Title }}
                </div>
              </div>

            </q-item-section>
          </q-item>

          <q-separator spaced inset />
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 q-pl-sm">Connection Type</q-item-label>
              <q-item-label caption class="q-pa-sm">
                <q-item-label caption class="q-pa-sm">
                  <div v-if="clickedLocation[3][0].ConnectionType.FormalName" class="connectionTypeSection">
                    Name: {{ clickedLocation[3][0].ConnectionType.FormalName }}
                  </div>

                  <div v-if="clickedLocation[3][0].ConnectionType.Title" class="connectionTypeSection">
                    Title: {{ clickedLocation[3][0].ConnectionType.Title }}
                  </div>

                  <div v-if="clickedLocation[3][0].Level.IsFastChargeCapable" class="connectionTypeSection">
                    Fast charge: <q-icon name="check_circle" color="gree-14" size="25px" />
                  </div>

                  <div v-else class="connectionTypeSection">
                    Fast charge: <q-icon name="clear" color="red-14" size="25px" />
                  </div>

                  <div class="q-mt-lg">
                    <q-btn v-if="!isMakerAddressInViaArray" @click="addMakerAddress" color="primary" class="full-width">
                      Add marker to route
                    </q-btn>

                    <q-btn v-else @click="removeMarkerAddress" color="orange" class="full-width">
                      Remove marker from route
                    </q-btn>
                  </div>
                </q-item-label>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
          <q-item v-if="clickedLocation[4]">
            <q-item-section>

              <q-item-label class="text-h6 q-pl-sm">Company</q-item-label>
              <q-item-label caption>

                <div v-if="clickedLocation[4].Title" class="row companySection">
                  <q-icon size="35px" name="business" class="q-mr-sm" color="white" />
                  <div class="companySection">{{ clickedLocation[4].Title }}</div>
                </div>

                <div class="row companySection">
                  <div v-if="clickedLocation[4].WebsiteURL" class="addressSection">
                    <q-icon size="35px" name="contact_page" class="q-mr-sm" color="white" />
                    <a :href="clickedLocation[4].WebsiteURL">{{ clickedLocation[4].WebsiteURL }}</a>
                  </div>
                </div>

                <div class="row companySection">
                  <div v-if="clickedLocation[4].PhonePrimaryContact">
                    <q-icon size="35px" name="local_phone" class="q-mr-sm" color="white" />
                    {{ clickedLocation[4].PhonePrimaryContact }}
                  </div>
                </div>

                <div class="row companySection">
                  <div v-if="clickedLocation[4].ContactEmail">
                    <q-icon size="35px" name="mail" class="q-mr-sm" color="white" />
                    {{ clickedLocation[4].ContactEmail }}
                  </div>
                </div>

              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      required: true
    },

    clickedLocation: {
      type: Object
    },

    via: {
      type: Array
    }
  },

  setup (props, { emit }) {
    const dialogComputed = computed({
      get: () => props.dialog,
      set: (val) => emit('update:dialog', false)
    })

    const isMakerAddressInViaArray = computed(() => {
      for (let i = 0; i < props.via.length; i++) {
        if (props.via[i][2] === currentMakerAddress.value[2]) {
          return true
        }
      }

      return false
    })

    const currentMakerAddress = computed(() => {
      const lat = props.clickedLocation[0]
      const lng = props.clickedLocation[1]
      const addrL1 = !props.clickedLocation[2].AddressLine1 ? '' : props.clickedLocation[2].AddressLine1
      const addrL2 = !props.clickedLocation[2].AddressLine2 ? '' : props.clickedLocation[2].AddressLine2
      const town = !props.clickedLocation[2].Town ? '' : props.clickedLocation[2].Town
      const postcode = !props.clickedLocation[2].Postcode ? '' : props.clickedLocation[2].Postcode
      const title = !props.clickedLocation[2].Country.Title ? '' : props.clickedLocation[2].Country.Title

      const address = addrL1 + ' ' + addrL2 + ' ' + town + ' ' + postcode + ' ' + title

      return [lat, lng, address]
    })

    const addMakerAddress = () => {
      emit('addToViaArray', currentMakerAddress.value)
    }

    const removeMarkerAddress = () => {
      emit('removeFromViaArray', currentMakerAddress.value)
    }

    return {
      dialogComputed,
      addMakerAddress,
      removeMarkerAddress,
      isMakerAddressInViaArray
    }
  }
})
</script>

<style lang="scss">
#chargeInfo {
  .card-bg-color {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .main {
    height: calc(100vh - 50px);
    margin-top: 30px;
    max-width: 500px;
    margin: 0 auto;
  }

  .addressSection {
    padding-right: 5px;
    font-size: 16px;
    line-height: 25px, ;
    color: rgb(184, 184, 184);
  }

  .connectionTypeSection {
    padding-right: 5px;
    font-size: 16px;
    line-height: 25px, ;
    color: rgb(184, 184, 184);
  }

  .companySection {
    padding-right: 5px;
    font-size: 16px;
    line-height: 25px, ;
    color: rgb(184, 184, 184);
  }

  .status {
    font-size: 16px;
  }

  .isAvailableClass {
    color: white;
    background-color: $green-14;
    border-radius: 5px;
    padding: 0 10px 0 10px;
  }

  .isNotAvailableClass {
    color: white;
    background-color: $red-14;
    border-radius: 5px;
    padding: 0 10px 0 10px;
  }
}
</style>

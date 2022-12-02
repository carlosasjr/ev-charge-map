<template>
  <div id="map"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { googleObject } from '../boot/google'
import { axiosOpenCharge } from 'src/boot/axios'

export default defineComponent({
  name: 'MapPage',
  setup () {
    let map = null
    const locations = []

    onMounted(async () => {
      await googleObject()

      map = initMap()

      await getChargePointData()

      console.log(map)
    })

    const initMap = () => {
      const options = {
        center: { lat: -23.45, lng: -46.57 },
        zoom: 6,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
      }

      return new window.google.maps.Map(document.getElementById('map'), options)
    }

    const getChargePointData = async () => {
      const res = await axiosOpenCharge.get(
        '?output=json' +
        '&countrycode=BR' +
        '&compact=false' +
        '&verbose=false' +
        '&maxresults=10' +
        '&key=8d4471c5-ee49-432f-957c-8755617cb09c'
      )

      const result = res.data.map((data) => {
        return [
          data.AddressInfo.Latitude,
          data.AddressInfo.Longitude
        ]
      })

      for (let i = 0; i < result.length; i++) {
        locations.push(result[i])
      }

      setMarkers()
    }

    const setMarkers = () => {
      for (let i = 0; i < locations.length; i++) {
        const singleLocation = locations[i]

        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(singleLocation[0], singleLocation[1]),
          map
        })

        console.log('marker', marker)
      }
    }
  }
})
</script>

<style lang='scss'>
#map {
  width:100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>

<template>
  <div id="map"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { googleObject } from '../boot/google'
import { axiosOpenCharge } from 'src/boot/axios'
import { useRouteStore } from 'src/stores/route-store'

export default defineComponent({
  name: 'MapPage',
  setup () {
    const routeStore = useRouteStore()

    let map = null
    const locations = []
    const latLngs = []

    const data = reactive({
      routeResults: null
    })

    onMounted(async () => {
      await googleObject()

      map = initMap()

      if (data.routeResults) {
        await getChargePointData(data.routeResults)
      }
    })

    const initMap = () => {
      const directionsService = new window.google.maps.DirectionsService()
      const directionsRenderer = new window.google.maps.DirectionsRenderer()

      const options = {
        center: { lat: -23.45, lng: -46.57 },
        zoom: 6,
        maxZoom: 17,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
      }

      const map = new window.google.maps.Map(document.getElementById('map'), options)

      if (routeStore.hasRoute) {
        getDirections(map, directionsRenderer, directionsService)
      }

      return map
    }

    const getDirections = (map, directionsRenderer, directionsService) => {
      directionsRenderer.setMap(map)

      const request = {
        origin: routeStore.getRoute.from,
        destination: routeStore.getRoute.to,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          data.routeResults = result
          directionsRenderer.setDirections(result)
        }
      })
    }

    const getChargePointData = async (newRouteResult) => {
      newRouteResult.routes[0].legs[0].steps.forEach(step => {
        latLngs.push('(' + step.lat_lngs[0].lat() + ',' + step.lat_lngs[0].lng() + ')')
      })

      const res = await axiosOpenCharge.get(
        '?output=json' +
        '&countrycode=BR' +
        '&polyline=' + latLngs +
        '&compact=false' +
        '&verbose=false' +
        '&maxresults=100' +
        '&key=8d4471c5-ee49-432f-957c-8755617cb09c'
      )

      const result = res.data.map((data) => {
        return [
          data.AddressInfo.Latitude,
          data.AddressInfo.Longitude,
          data.AddressInfo,
          data.Connections,
          data.OperatorInfo
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

        window.google.maps.event.addListener(marker, 'click', () => {
          console.log(singleLocation)
        })
      }
    }

    watch(() => data.routeResults, async (newRouteResult, oldRouteResult) => {
      if (newRouteResult !== null && oldRouteResult === null) {
        await getChargePointData(data.routeResults)
      }
    })
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

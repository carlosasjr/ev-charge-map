<template>
  <div id="rangeSlider">
    <div class="range">
      <div class="row">
        <div class="text-body1">Search Range</div>
        <div class="text-body1">Miles: {{ range }}</div>
      </div>
      <input type="range" min="1" max="10" v-model="data.range" class="slider" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  props: {
    range: {
      type: Number,
      default: 1
    }
  },

  setup (props, { emit }) {
    const data = reactive({
      range: props.range
    })

    watch(() => data.range, () => emit('update:range', Number(data.range)))

    return {
      data
    }
  }
})
</script>

<style lang="scss">
#rangeSlider {
  width: 100%;

  .slider {
    widows: 100%;
    height: 7px;
    border-radius: 5px;
  }

  .range {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 500;
  }

  .row {
    font-weight: 500;
    padding: 10px;
    font-size: 15px;
    justify-content: space-between;

  }
}
</style>

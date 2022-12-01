<template>
  <q-page id="MyDetailsPage">
    <q-toolbar class="text-white bg-teal-8">
      <q-toolbar-title>My Details</q-toolbar-title>
    </q-toolbar>

    <q-scroll-area class="form-style">
      <q-form class="q-pa-md q-gutter-y-md" @submit.prevent="handleUpdateDetails">
        <div class="text-h6">Update your details!</div>

        <q-input v-model="data.form.firstName" outlined stack-label label="First Name" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

        <q-input v-model="data.form.lastName" outlined stack-label label="Last Name" lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Last Name is required']" />

        <div class="text-yellow-10 text-bold q-mt-md">NOTE: This email is read only</div>
        <q-input v-model="data.form.email" type="email" outlined stack-label label="Email" readonly />

        <q-btn :loading="data.loading" label="Update Details" color="black" class="full-width" size="lg" type="submit">
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Updating in...
          </template>
        </q-btn>

      </q-form>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'UpdateDetailsPage',
  setup () {
    const handleUpdateDetails = async () => {
      data.loading = true
    }

    const data = reactive({
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        emails: ''
      }
    })

    return {
      data,
      handleUpdateDetails
    }
  }
})
</script>

<style lang='scss'>
#MyDetailsPage {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 180px);
    max-width: 500px;
  }

  .no-account {
    font-size: 17px;
  }
}
</style>

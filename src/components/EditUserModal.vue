<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Edit account</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModals()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">

    <form class="login">

      <ion-list inset>
        <ion-item>
          <ion-input color="primary" :value="newFullname" @input="newFullname = $event.target.value" type="text" placeholder="John Dule"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-input color="primary" :value="newEmail" @input="newEmail = $event.target.value" type="email" placeholder="john@dule.com"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="saveUser()">Save</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";
import { patch } from "@/functions/fetch/tools";


export default {
  props: {
    fullname: String,
    email: String
  },
  data () {
    return {
      newFullname: this.fullname,
      newEmail: this.email
    }
  },
  methods: {
    async saveUser () {
      const url = import.meta.env.VITE_API_URL + '/me'
      const data = {
        fullname: this.newFullname,
        email: this.newEmail,
      }
      await patch(url, data)
      const creds = JSON.parse(localStorage.getItem('userCredentials'))
      creds.email = this.newEmail
      localStorage.removeItem('userToken')
      localStorage.setItem('userCredentials', JSON.stringify(creds))

      closeModals()
    },
    closeModals
  }
}
</script>

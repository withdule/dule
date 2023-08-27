<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Edit "{{ name }}"</ion-title>
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
          <ion-input required color="primary" @input="name = $event.target.value" :value="name" type="text" placeholder="Films to watch"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-textarea auto-grow required color="primary" @input="content = $event.target.value" :value="content" placeholder="# Dule support markdown rich syntax">

          </ion-textarea>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="editNote()">Save</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import {patch} from "@/functions/fetch/tools";

export default {
  props: {
    name: String,
    content: String,
    id: String
  },
  data() {
    return {
      name: this.name,
      content: this.content,
      id: this.id
    }
  },
  methods: {
    async editNote () {
      const url = import.meta.env.VITE_API_URL + '/notes/' + this.id
      const data = {
        name: this.name,
        content: this.content
      }
      const event =  await patch(url, data)
      if (event) {
        closeModals()
      }
    },
    closeModals
  },
}
</script>

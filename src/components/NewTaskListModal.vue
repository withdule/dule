<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Create a new task</ion-title>
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
          <ion-input required color="primary" @input="name = $event.target.value" :value="name" type="text" placeholder="Build Dule"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="addTaskList()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import {post} from "@/functions/fetch/tools";

export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    async addTaskList () {
      const url = import.meta.env.VITE_API_URL + '/tasks/lists'
      const data = {
        name: this.name
      }
      const tasklist = await post(url, data)
      if (tasklist) {
        closeModals()
      }
    },
    closeModals
  },
}
</script>

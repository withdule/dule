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
          <ion-input required color="primary" @input="name = $event.target.value" :value="name" type="text" placeholder="Watering plants"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-select label="Tasklist" :value="tasklist" placeholder="Unordered">
            <ion-select-option value="unordered">Unordered</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="addTask()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"

export default {
  data() {
    return {
      name: "",
      tasklist: "unordered"
    }
  },
  methods: {
    addTask () {
      console.log(this.name, this.tasklist)
    },
    closeModals
  },
}
</script>

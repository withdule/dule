<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Appearance</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModal()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">

    <ion-list inset>
      <ion-item color="dark">
        <MoonStar slot="start"/>
        <ion-label>
          <p>Slide into the dark side</p>
          <h2>Dark mode</h2>
        </ion-label>
        <ion-toggle slot="end" @ionChange="changeTheme($event.detail.checked ? 'dark': 'light')" :checked="isDarkTheme()" class="ion-toggle-border">

        </ion-toggle>
      </ion-item>
      <ion-item disabled button>
        <Frame slot="start"/>
        <ion-label>
          <p>Customize app icon</p>
          <h2>Icon</h2>
        </ion-label>
      </ion-item>
    </ion-list>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle, IonToggle } from "@ionic/vue";
import { XCircle, MoonStar, Frame } from "lucide-vue-next";
</script>

<script lang="ts">

export default {
  methods: {
    closeModal() {
      window.dispatchEvent(new Event('closeModalsDeep2'))
    },
    changeTheme(theme: string) {
      localStorage.setItem('userAppearance', theme)
    },
    isDarkTheme() {
      return localStorage.getItem('userAppearance') == 'dark'
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/dash/resume">
          <ResumeIcon class="icon"/>
          <ion-label>Resume</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="events" href="/dash/events">
          <CalendarIcon class="icon"/>
          <ion-label>Events</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tasks" href="/dash/tasks">
          <TasksIcon class="icon"/>
          <ion-label>Tasks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="notes" href="/dash/notes">
          <NotesIcon class="icon"/>
          <ion-label>Notes</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
import {
    CalendarRange as CalendarIcon,
    ListChecks as TasksIcon,
    Sticker as NotesIcon,
    Newspaper as ResumeIcon
} from "lucide-vue-next";
</script>

<style>
.icon {
  width: 28px;
  height: 28px;
}

ion-tab-button {
  border-top: 2px solid #00000000;
}

ion-tab-button * {
  font-size: 1.3em !important;
}

ion-tab-button.tab-selected {
  border-top: 2px solid var(--ion-color-primary);
}
</style>
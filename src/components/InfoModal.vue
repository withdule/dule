<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Info</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModals()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="list-title">
      Understanding Dule working
    </div>
    <ion-list inset>
      <ion-item>
        <Sticker slot="start" class="ion-icon"/>
        <ion-label>
          <h2>Note</h2>
          <p>A timeless rich text. Titles, bold, italic, checkboxes and more...</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-list inset>
      <ion-item>
        <CheckCircle slot="start" class="ion-icon"/>
        <ion-label>
          <h2>Task</h2>
          <p>A timeless phrase, organized as a list.</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-list inset>
      <ion-item>
        <AlarmClock slot="start" class="ion-icon"/>
        <ion-label>
          <h2>Reminder</h2>
          <p>A scheduled notification.</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-list inset>
      <ion-item>
        <Calendar slot="start" class="ion-icon"/>
        <ion-label>
          <h2>Event</h2>
          <p>A timed event, showed in a calendar.</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <div class="list-title">
      Legal
    </div>
    <ion-list inset>
      <ion-item>
        <p>
          Dule is a free and open source software under MIT Licence.<br>
          See <a href="https://github.com/withdule/dule/blob/main/LEGAL.md" target="_blank">legal notice</a>, <a href="https://github.com/withdule/dule/blob/main/LICENSE" target="_blank">licence</a>.
        </p>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle, Calendar, AlarmClock, CheckCircle, Sticker } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";

export default {
  methods: {
    closeModals
  }
}
</script>

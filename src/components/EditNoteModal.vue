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
          <ion-input required color="primary" @input="newName = $event.target.value" :value="newName" type="text" placeholder="Films to watch"></ion-input>
        </ion-item>
      </ion-list>

      <ion-list inset>
        <ion-item>
          <ion-textarea ref="inputContent" auto-grow required color="primary" @input="newContent = $event.target.value" :value="newContent" placeholder="# Dule support markdown rich syntax">

          </ion-textarea>
          <div class="hidden" ref="preview">

          </div>
          <Eye @click="preview()" class="focusable" slot="end"/>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="editNote()">Save</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import {Eye, XCircle} from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import {patch} from "@/functions/fetch/tools";
import {marked} from "marked";

export default {
  props: {
    name: String,
    content: String,
    id: String
  },
  data() {
    return {
      newName: this.name,
      newContent: this.content,
    }
  },
  methods: {
    async editNote () {
      const url = import.meta.env.VITE_API_URL + '/notes/' + this.id
      const data = {
        name: this.newName,
        content: this.newContent
      }
      const note = await patch(url, data)
      if (note) {
        closeModals()
      }
    },
    preview() {
      this.$refs.preview.innerHTML = marked(this.newContent)
      this.$refs.preview.classList.toggle('hidden')
      this.$refs.inputContent.classList.toggle('hidden')
    },
    closeModals
  },
}
</script>

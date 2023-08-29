<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Write a new note</ion-title>
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
          <ion-textarea ref="inputContent" auto-grow required color="primary" @input="content = $event.target.value" :value="content" placeholder="# Dule support markdown rich syntax">

          </ion-textarea>
          <div class="hidden" ref="preview">

          </div>
          <Eye @click="preview()" class="focusable" slot="end"/>
        </ion-item>
      </ion-list>

      <ion-button expand="full" type="button" @click="addNote()">Add</ion-button>

    </form>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle, IonTextarea } from "@ionic/vue";
import { XCircle, Eye } from "lucide-vue-next";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import {post} from "@/functions/fetch/tools";
import {marked} from "marked";

export default {
  data() {
    return {
      name: "",
      content: ""
    }
  },
  methods: {
    async addNote () {
      const url = import.meta.env.VITE_API_URL + '/notes'
      const data = {
        name: this.name,
        content: this.content
      }
      const event =  await post(url, data)
      if (event) {
        closeModals()
      }
    },
    preview() {
      this.$refs.preview.innerHTML = marked(this.content)
      this.$refs.preview.classList.toggle('hidden')
      this.$refs.inputContent.classList.toggle('hidden')
    },
    closeModals
  },
}
</script>

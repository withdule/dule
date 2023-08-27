<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="createModal(EditNoteModal, 'modalEditNote', refs, { name, content, id })">
          <Pencil/>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ name }}</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModals()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding ion-content-padding" v-html="markdownToHTML(content)"/>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle, Pencil } from "lucide-vue-next";
import {createModal} from "@/functions/modals";
import EditNoteModal from "@/components/EditNoteModal.vue";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals"
import { marked } from 'marked'
import {ref} from "vue";


let refs = {
  modalEditNote: ref(null)
} as any

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
})

export default {
  props: {
    name: String,
    content: String,
    updatedAt: String,
    id: String
  },
  mounted () {
    refs['page'] = this.$el
  },
  data () {
    return {
      refs: refs
    }
  },
  methods: {
    closeModals,
    markdownToHTML(markdown: string) {
      return marked.parse(markdown)
    }
  },
}
</script>

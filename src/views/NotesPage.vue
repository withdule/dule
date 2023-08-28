<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Notes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list inset>
        <ion-item button @click="createModal(NewNoteModal, 'modalNewNote', refs)">
          <Plus slot="start"/>
          <ion-label>
            New note
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-note style="display: block; margin: auto; width: max-content" v-if="notes.length <= 0">Nothing here. Try writing a note above !</ion-note>

      <ion-list inset>
        <ion-item v-for="note in notes" button @click="createModal(ViewNoteModal, 'modalViewNote', refs, { name: note.name, content: note.content, id: note._id, updatedAt: note.updatedAt })">
          <ion-label>
            <p>{{ getPlainText(note.content).slice(0, 50) }}...</p>
            <h2>{{ note.name }}</h2>
          </ion-label>
          <Eye slot="end"/>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import '@/theme/globals.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { Plus, Eye } from "lucide-vue-next"
import {createModal} from "@/functions/modals";
import NewNoteModal from "@/components/NewNoteModal.vue";
import ViewNoteModal from "@/components/ViewNoteModal.vue";
</script>

<script lang="ts">

import { ref } from "vue";
import {get} from "@/functions/fetch/tools";
import { DuleNote } from "@/functions/interfaces";
import { marked } from 'marked'

let refs = {
  modalNewNote: ref(null),
  modalViewNote: ref(null)
} as any

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
  window.dispatchEvent(new Event('reload'))
})

export default {
  data () {
    return {
      refs: refs,
      notes: [] as DuleNote[]
    }
  },
  mounted () {
    refs['page'] = this.$refs.page
    window.addEventListener('reload', this.fetchNotes)
  },
  created () {
    this.fetchNotes()
  },
  methods: {
    async fetchNotes() {
      const url = import.meta.env.VITE_API_URL + '/notes'
      const notes = await get(url)
      if (notes) {
        notes.data.reverse() // Chrono order
        this.notes = notes.data
      }
      return
    },
    getPlainText(markdown: string) {
      const fictiveElement = document.createElement('div')
      fictiveElement.innerHTML = marked(markdown)
      return  fictiveElement.innerText
    }
  }
}
</script>

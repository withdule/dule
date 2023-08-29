<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Settings</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="closeModals()">
          <XCircle/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">

    <ion-list inset>
      <ion-item button @click="createModal(SettingsAppearanceModal, 'modalSettingsAppearance', refs)">
        <Umbrella slot="start"/>
        <ion-label>
          <p>Customize Dule</p>
          <h2>Appearance</h2>
        </ion-label>
      </ion-item>
      <ion-item button @click="createModal(EditUserModal, 'modalEditAccount', refs, { fullname, email })">
        <ScanFace slot="start"/>
        <ion-label>
          <p>Change your informations</p>
          <h2>Account</h2>
        </ion-label>
      </ion-item>
      <ion-item disabled button>
        <KeyRound slot="start"/>
        <ion-label>
          <p>Password lost ?</p>
          <h2>Change password</h2>
        </ion-label>
      </ion-item>
    </ion-list>

  </ion-content>
</template>

<script setup lang="ts">
import { IonTitle } from "@ionic/vue";
import { XCircle, Umbrella, ScanFace, KeyRound } from "lucide-vue-next";
import {createModal} from "@/functions/modals";
import EditUserModal from "@/components/EditUserModal.vue";
import SettingsAppearanceModal from "@/components/SettingsAppearanceModal.vue";
</script>

<script lang="ts">
import { closeModals } from "@/functions/modals";
import {ref} from "vue";


let refs = {
  modalSettingsAppearance: ref(null),
  modalEditAccount: ref(null)
}

window.addEventListener('closeModals', () => {
  Object.keys(refs).forEach(key => {
    if (refs[key].value) refs[key].value.dismiss()
  })
})

export default {
  props: {
    fullname: String,
    email: String
  },
  mounted() {
    refs['page'] = this.$el
  },
  data () {
    return {
      refs: refs
    }
  },
  methods: {
    closeModals
  }
}
</script>

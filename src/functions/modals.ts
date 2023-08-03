import { modalController } from "@ionic/vue";
import { Component } from "vue";

const closeModalEvent = new Event('closeModals')

function closeModals() {
    window.dispatchEvent(closeModalEvent)
}

async function createModal(component: Component, refName: string, refs: any) {
    refs[refName].value = await modalController.create({
        component: component,
        presentingElement: refs['page'].$el,
        canDismiss: true,
    })
    await refs[refName].value.present()
}

export {
    closeModals,
    createModal
}

import { modalController } from "@ionic/vue";

const closeModalEvent = new Event('closeModals')

function closeModals() {
    window.dispatchEvent(closeModalEvent)
}

async function createModal(component: Comment, refName: string, refs: object, callback: null) {
    refs[refName].value = await modalController.create({
        component: component,
        presentingElement: refs['page'].$el,
        canDismiss: true,
    })
    refs[refName].value.onDidDismiss = callback
    await refs[refName].value.present()
}

export {
    closeModals,
    createModal
}

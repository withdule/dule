import { Haptics } from '@capacitor/haptics';


async function vibrate() {
    await Haptics.vibrate();
}

async function endVibration() {
    await Haptics.selectionEnd();
}

async function startVibration() {
    await Haptics.selectionStart();
}

async function changedVibration() {
    await Haptics.selectionChanged();
}

export {
    vibrate,
    endVibration,
    startVibration,
    changedVibration
}

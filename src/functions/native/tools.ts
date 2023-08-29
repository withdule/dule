import {Haptics, ImpactStyle} from '@capacitor/haptics';


async function vibrate() {
    await Haptics.impact({ style: ImpactStyle.Light });
}

async function endVibration() {
    await Haptics.notification({ type: "SUCCESS" } as any);
}

async function changedVibration() {
    await Haptics.notification({ type: "WARNING" } as any);
}

export {
    vibrate,
    endVibration,
    changedVibration
}

import {get, handleResponse} from "@/functions/fetch/tools";
import {displayToast} from "@/functions/toasts";
import axios from "axios";

async function getToken(email: string, password: string, checks = true): Promise<string> {
    const url = import.meta.env.VITE_API_URL + '/me/login'
    const data = {
        email: email,
        password: password
    }
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    }
    const response = await handleResponse(axios.post(url, data, config), checks)

    if (response.code == 403) {
        logOut()
        await displayToast('Error', 'Unable to access API: forbidden. Please (re)login.', 3000, 'danger')
        setTimeout(() => {
            location.href = '/dash/resume'
        }, 3000)
    }
    return response.token as string
}

async function getAccount() {
    const url = import.meta.env.VITE_API_URL + '/me'
    const response = await get(url)
    response.data.user.createdAt = response.data.user.createdAt.slice(0, 10).replaceAll('-', '/')
    return response.data.user
}

function logOut() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userCredentials')
}

export {
    getToken,
    getAccount,
    logOut
}

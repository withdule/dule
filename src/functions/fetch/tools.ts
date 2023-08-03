import axios, {AxiosError, AxiosResponse} from "axios";
import {getToken} from "@/functions/fetch/account";
import {APIResponse} from "@/functions/fetch/interfaces";
import {displayToast} from "@/functions/toasts";


const successCodes = [200, 201]
const forbiddenCodes = [401, 403]


async function post(url: string, data: any) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    }
    return await handleResponse(axios.post(url, data, config))
}


async function patch(url: string, data: any) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    }
    return await handleResponse(axios.patch(url, data, config))
}


async function del(url: string) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    }
    return await handleResponse(axios.delete(url, config))
}


async function get(url: string) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    }
    return await handleResponse(axios.get(url, config))
}


async function handleResponse(request: Promise<AxiosResponse>, checks = true): Promise<APIResponse> {
    try {
        const response = await request
        return response.data
    } catch (err: AxiosError) {
        if (forbiddenCodes.includes(err.response.status) && checks) {
            const stringUserCreds = localStorage.getItem('userCredentials')
            console.log(stringUserCreds)
            if (stringUserCreds) {
                const userCreds = JSON.parse(stringUserCreds)
                localStorage.setItem('userToken', await getToken(userCreds.email, userCreds.password, false))
                return await axios.request(err.config).data
            } else {
                await displayToast('Error', 'Unable to access API: forbidden. Please (re)login.', 3000, 'danger')
                setTimeout(() => {
                    location.href = '/dash/resume'
                }, 3000)
            }
        } else {
            await displayToast('Error', 'An unknown error occured with the API', 2000, 'danger')
        }
        err.response.code = err.response.status
        return err.response
    }
}

export {
    handleResponse,
    post,
    patch,
    del,
    get
}
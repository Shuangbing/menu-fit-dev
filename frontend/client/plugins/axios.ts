import { Dialog } from "mand-mobile"

export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        if (process.browser && localStorage.token) {
            config.headers.Authorization = 'Bearer ' + localStorage.token
        }
        store.commit('updateLoading', true)
        return config
    })

    $axios.onResponse(response => {
        store.commit('updateLoading', false)
    })

    $axios.onError(error => {
        store.commit('updateLoading', false)
        const code = parseInt(error.response && error.response.status)
        if (error.response.data.message) {
            Dialog.alert({
                title: 'エラー',
                content: error.response.data.message,
                confirmText: 'はい',
            });
        }
        if (error.response.status === 401) redirect('/auth/login')
    })

}
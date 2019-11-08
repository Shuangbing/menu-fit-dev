
import { message } from 'ant-design-vue'

export default function ({ $axios, redirect, store, app }) {
    $axios.onRequest(config => {
        if (process.browser && localStorage.adminToken) {
            config.headers.Authorization = 'Bearer ' + localStorage.adminToken
        }
        store.commit('updateLoading', true)
    })

    $axios.onResponse(response => {
        store.commit('updateLoading', false)
    })

    $axios.onError(error => {
        if (error.response.status) redirect('/auth/login')
        if (error.response.data.message) message.info(error.response.data.message)
        store.commit('updateLoading', false)
    })
}
import axios from 'axios'
import type { AxiosInstance } from 'axios'

const TOKEN_KEY = 'token'

const BASE_URL = (import.meta.env.VITE_API_BASE as string) || ''

const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem(TOKEN_KEY)
	if (token && config.headers) {
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status
		if (status === 401) {
			localStorage.removeItem(TOKEN_KEY)

			const reqUrl: string = error?.config?.url ?? ''

			const isLoginRequest = reqUrl.includes('/login')
			if (!isLoginRequest && typeof window !== 'undefined') {
				window.location.href = '/login'
			}
		}
		return Promise.reject(error)
	}
)

export function setAuthToken(token?: string | null) {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token)
	} else {
		localStorage.removeItem(TOKEN_KEY)
	}
}

export function clearAuthToken() {
	localStorage.removeItem(TOKEN_KEY)
}

export default api

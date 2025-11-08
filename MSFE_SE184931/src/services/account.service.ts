import api from './api.service'
import { setAuthToken, clearAuthToken } from './api.service'

export async function login(username: string, password: string): Promise<string> {
  try {
    const resp = await api.post('/accounts/login', { username, password })
    const token: string | null = resp?.data?.token ?? null

    if (!token) {
      throw new Error('Login failed')
    }

    setAuthToken(token)
    return token
  } catch (err) {
    throw err
  }
}

export function logout() {
  clearAuthToken()
}
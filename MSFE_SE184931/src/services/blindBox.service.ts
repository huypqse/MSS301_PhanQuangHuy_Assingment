import type { BlindBox, BlindBoxRequest } from '../types/blindBox'
import api from './api.service'

export async function getAllBlindBoxes(): Promise<BlindBox[]> {
  try {
    const resp = await api.get('/blind-boxes')
    return resp?.data ?? []
  } catch (err) {
    throw err;
  }
}

export async function createBlindBox(blindBoxData: BlindBoxRequest): Promise<BlindBox> {
  try {
    const resp = await api.post('/blind-boxes', blindBoxData);
    return resp?.data;
  } catch (err) {
    throw err;
  }
}

export async function updateBlindBox(id: number, blindBoxData: BlindBoxRequest): Promise<BlindBox> {
  try {
    const resp = await api.put(`/blind-boxes/${id}`, blindBoxData);
    return resp?.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteBlindBox(id: number): Promise<void> {
  try {
    await api.delete(`/blind-boxes/${id}`);
  } catch (err) {
    throw err;
  }
}
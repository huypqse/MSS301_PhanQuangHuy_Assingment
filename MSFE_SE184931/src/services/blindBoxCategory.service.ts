import type { BlindBoxCategory, BlindBoxCategoryRequest } from '../types/blindBoxCategory';
import api from './api.service'

export async function getAllBlindBoxCategories(): Promise<BlindBoxCategory[]> {
  try {
    const resp = await api.get('/blind-boxes/categories')
    return resp?.data ?? []
  } catch (err) {
    throw err;
  }
}

export async function createBlindBoxCategory(categoryData: BlindBoxCategoryRequest): Promise<BlindBoxCategory> {
  try {
    const resp = await api.post('/blind-boxes/categories', categoryData);
    return resp?.data;
  } catch (err) {
    throw err;
  }
}

export async function updateBlindBoxCategory(id: number, categoryData: BlindBoxCategoryRequest): Promise<BlindBoxCategory> {
  try {
    const resp = await api.put(`/blind-boxes/categories/${id}`, categoryData);
    return resp?.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteBlindBoxCategory(id: number): Promise<void> {
  try {
    await api.delete(`/blind-boxes/categories/${id}`);
  } catch (err) {
    throw err;
  }
}


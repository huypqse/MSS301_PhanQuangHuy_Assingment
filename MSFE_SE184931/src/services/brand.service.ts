import type { Brand, BrandRequest } from '../types/brand'
import api from './api.service'

export const getAllBrands = async (): Promise<Brand[]> => {
  try {
    const resp = await api.get('/brands')
    return resp?.data ?? []
  } catch (err) {
    throw new Error('Failed to fetch brands')
  }
}

export const createBrand = async (brandData: BrandRequest): Promise<Brand> => {
  try {
    const resp = await api.post('/brands', brandData);
    return resp?.data;
  } catch (err) {
    throw err;
  }
}

export const updateBrand = async (id: string, brandData: BrandRequest): Promise<Brand> => {
  try {
    const resp = await api.put(`/brands/${id}`, brandData);
    return resp?.data;
  } catch (err) {
    throw new Error('Failed to update brand');
  }
}

export const deleteBrand = async (id: string): Promise<void> => {
  try {
    await api.delete(`/brands/${id}`);
  } catch (err) {
    throw new Error('Failed to delete brand');
  }
}
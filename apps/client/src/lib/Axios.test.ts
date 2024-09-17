import api from './axios'

describe('api conectada', () => {
  it('should have the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_BACKEND_URL)
  })
})

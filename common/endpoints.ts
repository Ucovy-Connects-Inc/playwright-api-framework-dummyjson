export const endpoints = {
  auth: {
    login: '/auth/login',
    me: '/auth/me'
  },
  users: {
    getAll: '/users',
    getById: (id: number) => `/users/${id}`,
    add: '/users/add',
    update: (id: number) => `/users/${id}`,
    delete: (id: number) => `/users/${id}`,
    search: (query: string) => `/users/search?q=${query}`
  }
};
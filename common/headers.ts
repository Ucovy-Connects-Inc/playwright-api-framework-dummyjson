export const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});
import { test, expect } from '@playwright/test';
import { UsersApi } from '../apis/usersapi';

test.describe('Authentication Tests', () => {

  test('should login successfully', async ({ request }) => {
    const usersApi = new UsersApi(request);

    const response = await usersApi.login({
      username: 'emilys',
      password: 'emilyspass'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.accessToken).toBeTruthy();
  });

  test('should fail login with invalid credentials', async ({ request }) => {
    const usersApi = new UsersApi(request);

    const response = await usersApi.login({
      username: 'invalid',
      password: 'wrong'
    });

    expect(response.status()).toBe(400);
  });

});
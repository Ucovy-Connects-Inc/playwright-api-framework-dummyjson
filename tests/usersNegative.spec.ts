import { test, expect } from '../fixtures';
import { statusCodes } from '../common/statuscodes';
import { getAuthHeader } from '../common/headers';

test.describe('Users API Negative Tests', () => {

  test('@negative TC-006 should fail login with invalid credentials', async ({ usersApi }) => {

  const response = await usersApi.login({
    username: 'invalidUser',
    password: 'wrongPassword'
  });

  expect(response.status()).toBe(statusCodes.BAD_REQUEST);

  const body = await response.json();
  expect(body.message).toBeTruthy();
});

  test('@negative TC-007 should fail updating invalid user id', async ({ usersApi }) => {

    const response = await usersApi.updateUser(
      999999,
      { age: 45 },
      getAuthHeader("invalidToken")
    );

    expect(response.status()).toBe(statusCodes.NOT_FOUND);
  });


  test('@negative TC-008 should fail deleting invalid user id', async ({ usersApi }) => {

    const response = await usersApi.deleteUser(
      999999,
      getAuthHeader("invalidToken")
    );

    expect(response.status()).toBe(statusCodes.NOT_FOUND);
  });

});
import { test, expect } from '../fixtures';
import { validUser } from '../common/testdata';
import { getAuthHeader } from '../common/headers';
import { statusCodes } from '../common/statuscodes';
import { userSchema } from '../schemas/userSchema';
import { validateSchema } from '../common/schemaValidator';

test.describe('Users CRUD Tests', () => {

  let token: string;

  test.beforeEach(async ({ usersApi }) => {

    const loginResponse = await usersApi.login(validUser);
    expect(loginResponse.status()).toBe(statusCodes.OK);

    const loginBody = await loginResponse.json();
    token = loginBody.accessToken;
  });

  test('@smoke TC-001 should get all users', async ({ usersApi }) => {

    const response = await usersApi.getAllUsers();
    expect(response.status()).toBe(statusCodes.OK);

    const body = await response.json();

    expect(body.users.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
  });

  test('@regression TC-002 should create new user', async ({ usersApi }) => {

    const dynamicPayload = {
      firstName: `Auto${Date.now()}`,
      lastName: 'User',
      age: 30
    };

    const response = await usersApi.createUser(
      dynamicPayload,
      getAuthHeader(token)
    );

    expect(response.status()).toBe(statusCodes.CREATED);

    const body = await response.json();

    expect(body.firstName).toBe(dynamicPayload.firstName);
    expect(body).toHaveProperty('id');

    // Schema validation
    validateSchema(userSchema, body);
  });

  test('@regression TC-003 should update existing user', async ({ usersApi }) => {

    const updateResponse = await usersApi.updateUser(
      1,
      { age: 40 },
      getAuthHeader(token)
    );

    expect(updateResponse.status()).toBe(statusCodes.OK);

    const updatedBody = await updateResponse.json();

    expect(updatedBody.age).toBe(40);
  });

  test('@regression TC-004 should delete existing user', async ({ usersApi }) => {

    const deleteResponse = await usersApi.deleteUser(
      1,
      getAuthHeader(token)
    );

    expect(deleteResponse.status()).toBe(statusCodes.OK);
  });

  test('@smoke TC-005 should search user', async ({ usersApi }) => {

    const response = await usersApi.searchUser('Emily');

    expect(response.status()).toBe(statusCodes.OK);

    const body = await response.json();

    expect(body.users.length).toBeGreaterThan(0);
  });

});
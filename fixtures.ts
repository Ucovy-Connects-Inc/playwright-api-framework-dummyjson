import { test as base } from '@playwright/test';
import { UsersApi } from './apis/usersapi';

type ApiFixtures = {
  usersApi: UsersApi;
};

export const test = base.extend<ApiFixtures>({
  usersApi: async ({ request }, use) => {
    const usersApi = new UsersApi(request);
    await use(usersApi);
  },
});

export { expect } from '@playwright/test';
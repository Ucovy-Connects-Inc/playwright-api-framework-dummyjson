import { BaseApi } from './baseapi';
import { endpoints } from '../common/endpoints';

export class UsersApi extends BaseApi {

  async login(payload: any) {
    return await this.post(endpoints.auth.login, payload);
  }

  async getAllUsers() {
    return await this.get(endpoints.users.getAll);
  }

  async getUserById(id: number) {
    return await this.get(endpoints.users.getById(id));
  }

  async createUser(payload: any, headers: any) {
    return await this.post(endpoints.users.add, payload, headers);
  }

  async updateUser(id: number, payload: any, headers: any) {
    return await this.put(endpoints.users.update(id), payload, headers);
  }

  async deleteUser(id: number, headers: any) {
    return await this.delete(endpoints.users.delete(id), headers);
  }

  async searchUser(query: string) {
    return await this.get(endpoints.users.search(query));
  }
}
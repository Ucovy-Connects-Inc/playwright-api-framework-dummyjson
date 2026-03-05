import { APIRequestContext } from '@playwright/test';

export class BaseApi {

  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(url: string, headers?: any) {

    console.log(`\nGET Request → ${url}`);

    const response = await this.request.get(url, { headers });

    console.log(`Status: ${response.status()}`);
    console.log(`Response:`, await response.json());

    return response;
  }

  async post(url: string, body?: any, headers?: any) {

    console.log(`\nPOST Request → ${url}`);
    console.log(`Payload:`, body);

    const response = await this.request.post(url, {
      data: body,
      headers
    });

    console.log(`Status: ${response.status()}`);
    console.log(`Response:`, await response.json());

    return response;
  }

  async put(url: string, body?: any, headers?: any) {

    console.log(`\nPUT Request → ${url}`);
    console.log(`Payload:`, body);

    const response = await this.request.put(url, {
      data: body,
      headers
    });

    console.log(`Status: ${response.status()}`);
    console.log(`Response:`, await response.json());

    return response;
  }

  async delete(url: string, headers?: any) {

    console.log(`\nDELETE Request → ${url}`);

    const response = await this.request.delete(url, { headers });

    console.log(`Status: ${response.status()}`);

    return response;
  }
}
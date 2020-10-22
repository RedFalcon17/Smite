function extend(...args: any[]) {
  return Object.assign({}, ...args);
}

type ClientResponse<T> = { data: T };

async function resolveBody<T>(response: Response): Promise<ClientResponse<T>> {
  const contentType = response.headers.get("content-type") || "";

  const data = await (() => {
    if (/json/.test(contentType)) return response.json();
    if (/image/.test(contentType)) return response.blob();
    if (/octet-stream/.test(contentType)) return response.blob();
    return response.text();
  })();

  if (response.ok) return data;
  throw data;
}

export async function httpGet<T>(
  url: string,
  headers = {}
): Promise<ClientResponse<T>> {
  const response = await fetch(url, { headers });
  return resolveBody(response);
}

export class Client {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  get<T>(route: string, headers = {}) {
    return httpGet<T>(this.url + route, headers);
  }

  put<T>(route: string, body: BodyInit, headers = {}) {
    return fetch(this.url + route, {
      headers: extend({ "content-type": "application/json" }, headers),
      method: "PUT",
      body
    }).then(resolveBody);
  }

  patch<T>(route: string, body: BodyInit, headers = {}) {
    return fetch(this.url + route, {
      headers: extend({ "content-type": "application/json" }, headers),
      method: "PATCH",
      body
    }).then(resolveBody);
  }

  post<t>(route: string, body: BodyInit, headers = {}) {
    return fetch(this.url + route, {
      headers: extend({ "content-type": "application/json" }, headers),
      method: "POST",
      body
    }).then(resolveBody);
  }

  delete(route: string, headers = {}) {
    return fetch(this.url + route, {
      headers,
      method: "DELETE"
    }).then(resolveBody);
  }
}

export const API = new Client(
  "https://us-central1-smite-source.cloudfunctions.net/api"
);

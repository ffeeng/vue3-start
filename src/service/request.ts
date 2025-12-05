export const http = {
  get(url: string, params?: Record<string, any>) {
    const searchParams = new URLSearchParams(params)
    return fetch(`${url}?${searchParams.toString()}`, {
      method: 'GET',
    }).then(res => res.text())
  },
  post(url: string, body?: Record<string, any>) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(res => res.json())
  },
  put(url: string, body: Record<string, any>) {
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    }).then(res => res.json())
  },
  del(url: string, params: Record<string, any>) {
    const searchParams = new URLSearchParams(params)
    return fetch(`${url}?${searchParams.toString()}`, {
      method: 'DELETE',
    }).then(res => res.json())
  },

}

import axios from 'axios'

export class AxiosHttpClient {
  async request(data) {
    console.log(data)
    let axiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        axiosResponse = error.response
      } else {
        throw error
      }
    }
    console.log({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}

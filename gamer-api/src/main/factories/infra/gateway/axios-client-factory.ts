import { AxiosHttpClient, HttpClient } from '@/infra/gateway'

export const makeAxiosClient = (): HttpClient => new AxiosHttpClient()

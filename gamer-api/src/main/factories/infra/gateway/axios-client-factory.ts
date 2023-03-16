import { AxiosHttpClient, type HttpClient } from '@/infra/gateway'

export const makeAxiosClient = (): HttpClient => new AxiosHttpClient()

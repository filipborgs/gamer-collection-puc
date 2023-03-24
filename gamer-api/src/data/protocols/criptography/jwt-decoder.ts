export interface JwtDecoder {
  decode: (token: string) => Promise<any>
}

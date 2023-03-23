export interface JwtGenerator {
  generate: (data: any) => Promise<string>
}

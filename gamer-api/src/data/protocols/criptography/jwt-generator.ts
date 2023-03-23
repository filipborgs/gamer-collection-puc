export interface JwtGenerator {
  generate: (id: string) => Promise<string>
}

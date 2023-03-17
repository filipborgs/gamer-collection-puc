export interface AddUserParams {
  name: string
  email: string
  password: string
}

export interface AddUser {
  add: (data: AddUserParams) => Promise<string>
}

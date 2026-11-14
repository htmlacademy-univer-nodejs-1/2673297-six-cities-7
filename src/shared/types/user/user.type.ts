export enum UserType {
  Default = 'default',
  Pro = 'pro',
}

export type User = {
  name: string,
  email: string,
  avatarPath: string,
  type: UserType
}

export const CreateUserMessages = {
  name: {
    invalidFormat: 'name must be a string',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarPath: {
    invalidFormat: 'path must be a string',
  },
  type: {
    invalidFormat: 'type must be default or pro',
  },
  password: {
    invalidFormat: 'password must be a string',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;

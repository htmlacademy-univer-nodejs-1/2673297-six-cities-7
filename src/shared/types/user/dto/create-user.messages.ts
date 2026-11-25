export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is string',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarPath: {
    invalidFormat: 'path is url',
  },
  type: {
    invalidFormat: 'type must be Default or Pro',
  },
  password: {
    invalidFormat: 'password is string',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;

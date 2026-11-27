export const CreateLoginUserMessage = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  password: {
    invalidFormat: 'password must be a string',
  }
} as const;

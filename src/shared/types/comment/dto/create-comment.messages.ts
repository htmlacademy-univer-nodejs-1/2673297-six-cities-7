export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is string',
    lengthField: 'min length is 5, max is 2024'
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: 'minimum rating is 1',
    maxValue: 'maximum rating is 5',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;

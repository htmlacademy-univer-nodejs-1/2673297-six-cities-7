export const OfferValidationMessage = {
  name: {
    invalidFormat: 'name is string',
    lengthField: 'min length is 10, max is 100'
  },
  description: {
    invalidFormat: 'description is string',
    lengthField: 'min length is 20, max is 1024'
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  city: {
    invalidFormat: 'city must be one of [Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf]',
  },
  preview: {
    invalidFormat: 'preview is url',
  },
  images: {
    invalidFormat: 'must be array and each image is url',
    lengthField: 'should be 6 images',
  },
  isPremium: {
    invalidFormat: 'isPremium is boolean',
  },
  type: {
    invalid: 'type must be apartment, room, house or hotel',
  },
  numberRooms: {
    invalidFormat: 'number of rooms must be an integer',
    min: 'minimum number of rooms is 1',
    max: 'maximum number of rooms is 8',
  },
  numberGuests: {
    invalidFormat: 'number of guests must be an integer',
    min: 'minimum number of rooms is 1',
    max: 'maximum number of rooms is 10',
  },
  cost: {
    invalidFormat: 'cost must be an integer',
    min: 'minimum price is 100',
    max: 'maximum price is 100000',
  },
  comforts: {
    invalidFormat: 'field comforts must be an array',
    invalidComfort: 'comforts field must be an array of valid comfort type: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'coordinates is required',
  }
} as const;

import {User} from '../user/user.type.js';
import {TypeOffer} from '../type-offer.enum.js';
import {ComfortType} from '../comfort.enum.js';
import {City} from '../city.type.js';
import {Coordinates} from '../coordinates.types.js';

export type Offer = {
  name: string,
  description: string,
  createdDate: Date,
  city: City,
  preview: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: TypeOffer,
  numberRooms: number,
  numberGuests: number,
  cost: number,
  comforts: ComfortType[],
  author: User,
  coordinates: Coordinates
}

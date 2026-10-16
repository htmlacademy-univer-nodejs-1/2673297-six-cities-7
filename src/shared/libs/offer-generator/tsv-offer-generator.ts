import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import {MockServerData} from '../../types/mock-server-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/common.js';
import {TypeOffer} from '../../types/type-offer.enum.js';
import {ComfortType} from '../../types/comfort.enum.js';
import {UserType} from '../../types/user.type.js';
import {CITIES} from '../../types/city.constants.js';


const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_NUMBER_ROOMS = 1;
const MAX_NUMBER_ROOMS = 4;

const MIN_NUMBER_GUESTS = 1;
const MAX_NUMBER_GUESTS = 5;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const cityNames = CITIES.map((city) => city.name);
    const city = getRandomItem(cityNames);
    const preview = getRandomItem(this.mockData.previews);
    const randomImages = getRandomItems<string>(this.mockData.images);
    const images = `[${randomImages.map((img) => `"${img}"`).join(', ')}]`;
    const isPremium = getRandomItem([false, true]).toString();
    const isFavorite = getRandomItem([false, true]).toString();
    const rating = generateRandomValue(1, 5).toString();
    const type = getRandomItem([TypeOffer.hotel, TypeOffer.apartment, TypeOffer.house, TypeOffer.room]).toString();
    const numberRooms = generateRandomValue(MIN_NUMBER_ROOMS, MAX_NUMBER_ROOMS).toString();
    const numberGuests = generateRandomValue(MIN_NUMBER_GUESTS, MAX_NUMBER_GUESTS).toString();
    const cost = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const randomComforts = getRandomItems<string>([
      ComfortType.airConditioning,
      ComfortType.babySeat,
      ComfortType.fridge,
      ComfortType.towels,
      ComfortType.washer,
      ComfortType.laptopFriendlyWorkspace,
      ComfortType.breakfast
    ]);
    const comforts = `[${randomComforts.map((comfort) => `"${comfort}"`).join(', ')}]`;
    const userName = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem([UserType.Pro, UserType.Default]).toString();
    const latitude = generateRandomValue(0, 180, 6).toString();
    const longitude = generateRandomValue(0, 180, 6).toString();
    return [
      name, description, createdDate, city,
      preview, images, isPremium, isFavorite,
      rating, type, numberRooms, numberGuests,
      cost, comforts, userName, email, avatar,
      userType, latitude, longitude
    ].join('\t');
  }
}

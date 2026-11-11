import {CityName} from '../../city.enum.js';
import {TypeOffer} from '../../type-offer.enum.js';
import {ComfortType} from '../../comfort.enum.js';
import {Coordinates} from '../../coordinates.types.js';


export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public city?: CityName;
  public preview?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: TypeOffer;
  public numberRooms?: number;
  public numberGuests?: number;
  public cost?: number;
  public comforts?: ComfortType[];
  public coordinates?: Coordinates;
}

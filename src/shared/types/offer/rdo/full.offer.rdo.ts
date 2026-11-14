import {Expose, Type} from 'class-transformer';
import {OfferRdo} from './offer.rdo.js';
import {UserRdo} from '../../user/rdo/user.rdo.js';

export class CoordinatesRdo {
  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}

export class FullOfferRdo extends OfferRdo{
  @Expose()
  public description: string;

  @Expose()
  public images: string[];

  @Expose()
  public numberRooms: number;

  @Expose()
  public numberGuests: number;

  @Expose()
  public comforts: string[];

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  @Type(() => CoordinatesRdo)
  public coordinates: CoordinatesRdo;
}

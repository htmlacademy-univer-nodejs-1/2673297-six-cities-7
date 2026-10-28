import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {ComfortType} from '../comfort.enum.js';
import {TypeOffer} from '../type-offer.enum.js';
import {CityName} from '../city.enum.js';
import {Coordinates} from '../coordinates.types.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name: string;

  @prop({trim: true, required: true })
  public description: string;

  @prop({required: true})
  public createdDate: Date;

  @prop({
    type: () => String,
    enum: CityName,
    required: true})
  public city: CityName;

  @prop({required: true})
  public preview: string;

  @prop({ type: () => [String], required: true })
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rating: number;

  @prop({
    type: () => String,
    enum: TypeOffer,
    required: true
  })
  public type: string;

  @prop({required: true})
  public numberRooms: number;

  @prop({required: true})
  public numberGuests: number;

  @prop({required: true})
  public cost: number;

  @prop({
    type: () => [String],
    enum: ComfortType,
    required: true
  })
  public comforts: ComfortType[];

  @prop({default: 0})
  public commentCount: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({_id: false, required: true})
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);

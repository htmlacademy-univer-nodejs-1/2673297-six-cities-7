import { defaultClasses, getModelForClass, modelOptions, prop, Ref, index } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface FavoriteEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
  },
})
@index({ userId: 1, offerId: 1 }, { unique: true })
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ ref: UserEntity, required: true })
  public userId: Ref<UserEntity>;

  @prop({ ref: OfferEntity, required: true })
  public offerId: Ref<OfferEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);

import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';

export interface FavoriteService {
  add(userId: string, offerId: string): Promise<void>;
  remove(userId: string, offerId: string): Promise<void>;
  findByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;
  exists(userId: string, offerId: string): Promise<boolean>;
}

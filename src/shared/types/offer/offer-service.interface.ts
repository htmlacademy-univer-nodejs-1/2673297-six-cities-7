import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {CityName} from '../city.enum.js';
import {DocumentExists} from '../document-exists.interface.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  findPremiumByCity(city: CityName): Promise<DocumentType<OfferEntity>[]>;
  exists(offerId: string): Promise<boolean>;
}

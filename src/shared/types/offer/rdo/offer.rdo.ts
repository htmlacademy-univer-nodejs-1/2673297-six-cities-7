import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public cost: number;

  @Expose()
  public name: string;

  @Expose()
  public type: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public createdDate: string;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;
}

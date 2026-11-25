import {CityName} from '../../city.enum.js';
import {TypeOffer} from '../../type-offer.enum.js';
import {ComfortType} from '../../comfort.enum.js';
import {Coordinates} from '../../coordinates.types.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString, IsUrl,
  Length,
  Max,
  Min, ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {OfferValidationMessage} from './offer.messages.js';


export class CreateOfferDto {
  @IsString({message: OfferValidationMessage.name.invalidFormat})
  @Length(10, 100, { message: OfferValidationMessage.name.lengthField })
  public name: string;

  @IsString({message: OfferValidationMessage.description.invalidFormat})
  @Length(20, 1024, { message: OfferValidationMessage.description.lengthField })
  public description: string;

  @IsDateString({}, {message: OfferValidationMessage.date.invalidFormat})
  public createdDate: Date;

  @IsEnum(CityName, {message: OfferValidationMessage.city.invalidFormat})
  public city: CityName;

  @IsUrl({}, {message: OfferValidationMessage.preview.invalidFormat})
  public preview: string;

  @IsArray({message: OfferValidationMessage.images.invalidFormat})
  @IsUrl({}, { each: true, message: OfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(6, {message: OfferValidationMessage.images.lengthField})
  @ArrayMaxSize(6, {message: OfferValidationMessage.images.lengthField})
  public images: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsEnum(TypeOffer, {message: OfferValidationMessage.type.invalid})
  public type: TypeOffer;

  @IsInt({message: OfferValidationMessage.numberRooms.invalidFormat})
  @Min(1, {message: OfferValidationMessage.numberRooms.min})
  @Max(8, {message: OfferValidationMessage.numberRooms.max})
  public numberRooms: number;

  @IsInt({message: OfferValidationMessage.numberGuests.invalidFormat})
  @Min(1, {message: OfferValidationMessage.numberGuests.min})
  @Max(10, {message: OfferValidationMessage.numberGuests.max})
  public numberGuests: number;

  @IsInt({message: OfferValidationMessage.cost.invalidFormat})
  @Min(100, {message: OfferValidationMessage.cost.min})
  @Max(100000, {message: OfferValidationMessage.cost.max})
  public cost: number;

  @IsArray({message: OfferValidationMessage.comforts.invalidFormat})
  @IsEnum(ComfortType, { each: true, message: OfferValidationMessage.comforts.invalidComfort })
  public comforts: ComfortType[];

  @IsMongoId({message: OfferValidationMessage.userId.invalidId})
  public userId: string;

  @ValidateNested({message: OfferValidationMessage.coordinates.invalidFormat})
  @Type(() => Coordinates)
  public coordinates: Coordinates;
}

import {CityName} from '../../city.enum.js';
import {TypeOffer} from '../../type-offer.enum.js';
import {ComfortType} from '../../comfort.enum.js';
import {Coordinates} from '../../coordinates.types.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt, IsOptional,
  IsString,
  IsUrl,
  Length, Max,
  Min, ValidateNested
} from 'class-validator';
import {OfferValidationMessage} from './offer.messages.js';
import {Type} from 'class-transformer';


export class UpdateOfferDto {
  @IsOptional()
  @IsString({message: OfferValidationMessage.name.invalidFormat})
  @Length(10, 100, { message: OfferValidationMessage.name.lengthField })
  public name?: string;

  @IsOptional()
  @IsString({message: OfferValidationMessage.description.invalidFormat})
  @Length(20, 1024, { message: OfferValidationMessage.description.lengthField })
  public description?: string;

  @IsOptional()
  @IsEnum(CityName, {message: OfferValidationMessage.city.invalidFormat})
  public city?: CityName;

  @IsOptional()
  @IsUrl({}, {message: OfferValidationMessage.preview.invalidFormat})
  public preview?: string;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.images.invalidFormat})
  @IsUrl({}, { each: true, message: OfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(6, {message: OfferValidationMessage.images.lengthField})
  @ArrayMaxSize(6, {message: OfferValidationMessage.images.lengthField})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(TypeOffer, {message: OfferValidationMessage.type.invalid})
  public type?: TypeOffer;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.numberRooms.invalidFormat})
  @Min(1, {message: OfferValidationMessage.numberRooms.min})
  @Max(8, {message: OfferValidationMessage.numberRooms.max})
  public numberRooms?: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.numberGuests.invalidFormat})
  @Min(1, {message: OfferValidationMessage.numberGuests.min})
  @Max(10, {message: OfferValidationMessage.numberGuests.max})
  public numberGuests?: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.cost.invalidFormat})
  @Min(100, {message: OfferValidationMessage.cost.min})
  @Max(100000, {message: OfferValidationMessage.cost.max})
  public cost?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.comforts.invalidFormat})
  @IsEnum(ComfortType, { each: true, message: OfferValidationMessage.comforts.invalidComfort })
  public comforts?: ComfortType[];

  @IsOptional()
  @ValidateNested({message: OfferValidationMessage.coordinates.invalidFormat})
  @Type(() => Coordinates)
  public coordinates?: Coordinates;
}

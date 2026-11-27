import { prop } from '@typegoose/typegoose';
import {IsNumber, Max, Min} from 'class-validator';

export class Coordinates {
  @prop()
  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude: number;

  @prop()
  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude: number;
}

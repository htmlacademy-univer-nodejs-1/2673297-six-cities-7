import { prop } from '@typegoose/typegoose';

export class Coordinates {
  @prop()
  public latitude: number;

  @prop()
  public longitude: number;
}

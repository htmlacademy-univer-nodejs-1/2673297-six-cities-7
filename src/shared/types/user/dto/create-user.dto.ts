import {UserType} from '../user.type.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath: string;
  public type: UserType;
  public password: string;
}

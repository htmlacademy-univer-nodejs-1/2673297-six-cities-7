import {UserType} from '../user.type';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatar: string;
  public type: UserType;
  public password: string;
}

import {UserType} from '../user.type.js';
import {IsEmail, IsEnum, IsOptional, IsString, IsUrl, Length} from 'class-validator';
import {CreateUserMessages} from './create-user.messages.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath: string;

  @IsEnum(UserType, {message: CreateUserMessages.type.invalidFormat})
  public type: UserType;

  @IsString({message: CreateUserMessages.password.invalidFormat})
  public password: string;
}

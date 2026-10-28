import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Offer } from '../../shared/types/offer/offer.type.js';
import { UserService } from '../../shared/types/user/user-service.interface.js';
import { OfferService } from '../../shared/types/offer/offer-service.interface.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService } from '../../shared/types/user/default-user.service.js';
import { UserModel } from '../../shared/types/user/user.entity.js';
import { DefaultOfferService } from '../../shared/types/offer/default-offer.service.js';
import { OfferModel } from '../../shared/types/offer/offer.entity.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { CreateOfferDto } from '../../shared/types/offer/dto/create-offer.dto.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
    this.onImportError = this.onImportError.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    if (!filename || !login || !password || !host || !dbname || !salt) {
      console.error(chalk.red('Error: not enough arguments. Usage: --import <path> <login> <password> <host> <dbname> <salt>'));
      return;
    }

    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);
    fileReader.on('error', this.onImportError);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
      await this.databaseClient.disconnect();
    }
  }

  private async onImportedLine(offer: Offer, resolve: () => void) {
    try {
      await this.saveOffer(offer);
    } catch (error) {
      this.logger.error(`Failed to save offer "${offer.name}"`, error as Error);
    } finally {
      resolve();
    }
  }

  private onCompleteImport(count: number) {
    console.info(chalk.bold.green(`${count} rows imported.`));
    this.databaseClient.disconnect();
  }

  private onImportError(message: string) {
    console.error(chalk.red(message));
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      name: offer.author.name,
      email: offer.author.email,
      avatar: offer.author.avatar,
      type: offer.author.type,
      password: DEFAULT_USER_PASSWORD,
    }, this.salt);

    const dto: CreateOfferDto = {
      name: offer.name,
      description: offer.description,
      createdDate: offer.createdDate,
      city: offer.city.name,
      preview: offer.preview,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      type: offer.type,
      numberRooms: offer.numberRooms,
      numberGuests: offer.numberGuests,
      cost: offer.cost,
      comforts: offer.comforts,
      userId: user.id,
      coordinates: offer.coordinates,
    };

    await this.offerService.create(dto);
  }
}

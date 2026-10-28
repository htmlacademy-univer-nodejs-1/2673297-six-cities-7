import {createReadStream} from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer/offer.type.js';
import { CITIES } from '../../types/city.constants.js';
import { ComfortType } from '../../types/comfort.enum.js';
import { TypeOffer } from '../../types/type-offer.enum.js';
import { User, UserType } from '../../types/user/user.type.js';
import EventEmitter from 'node:events';

const CHUNK_SIZE = 16384;

const parseBoolean = (value: string): boolean => value === 'true';

const parseNumber = (value: string): number => Number.parseFloat(value);

const parseStringArray = (value: string): string[] => JSON.parse(value) as string[];

export class TSVFileReader extends EventEmitter implements FileReader {

  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;
        const cleanRow = completeRow.replace(/^\uFEFF/, '').replace(/\r$/, '');

        if (cleanRow.trim().length > 0) {
          try {
            const offer = this.parseLineToOffer(cleanRow);

            await new Promise((resolve) => {
              this.emit('line', offer, resolve);
            });
          } catch (error) {
            this.emit('error', `Ошибка при обработке строки ${importedRowCount}: ${error}`);
          }
        }
      }
    }

    this.emit('end', importedRowCount);
  }

  private parseLineToOffer(line: string): Offer {
    const row = line.split('\t');
    const [
      name,
      description,
      createdDate,
      cityName,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      offerType,
      numberRooms,
      numberGuests,
      cost,
      comforts,
      authorName,
      email,
      avatar,
      userType,
      latitude,
      longitude,
    ] = row;

    const city = CITIES.find((item) => item.name === cityName);

    if (!city) {
      throw new Error(`Unknown city "${cityName}"`);
    }

    const author: User = {
      name: authorName,
      email,
      avatar,
      type: userType as UserType,
    };

    return {
      name,
      description,
      createdDate: new Date(createdDate),
      city,
      preview,
      images: parseStringArray(images),
      isPremium: parseBoolean(isPremium),
      isFavorite: parseBoolean(isFavorite),
      rating: parseNumber(rating),
      type: offerType as TypeOffer,
      numberRooms: parseNumber(numberRooms),
      numberGuests: parseNumber(numberGuests),
      cost: parseNumber(cost),
      comforts: parseStringArray(comforts) as ComfortType[],
      author,
      coordinates: {
        latitude: parseNumber(latitude),
        longitude: parseNumber(longitude),
      },
    };
  }
}

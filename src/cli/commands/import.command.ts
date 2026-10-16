import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import {Offer} from '../../shared/types/offer.type';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(offer: Offer) {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(chalk.bold.green(`${count} rows imported.`));
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    if (!filename) {
      console.error(chalk.red('Error: file path is required. Usage: --import <path>'));
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();

      console.info();
      console.info(chalk.bold.green(`Data from "${filename}" was successfully imported.`));
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}

import chalk from 'chalk';
import { Command } from './command.interface.js';

const COMMANDS: [command: string, description: string][] = [
  ['--version', 'выводит номер версии'],
  ['--help', 'печатает этот текст'],
  ['--import <path> <login> <password> <host> <dbname> <salt>', 'импортирует данные из TSV в MongoDB'],
  ['--generate <count> <path> <url>', 'генерирует данные TSV']
];

export class HelpCommand implements Command {

  public getName(): string {
    return '--help';
  }

  public execute(..._parameters: string[]): void {
    const commandColumnWidth = Math.max(...COMMANDS.map(([name]) => name.length)) + 4;

    console.info();
    console.info(chalk.bold.cyan('  Программа для подготовки данных для REST API сервера.'));
    console.info();
    console.info(chalk.italic('  Пример:'));
    console.info(chalk.gray('    npm start -- --<command> [--arguments]'));
    console.info();
    console.info(chalk.bold('  Команды:'));

    COMMANDS.forEach(([name, description]) => {
      const command = chalk.yellow(name.padEnd(commandColumnWidth));
      const comment = chalk.gray(`# ${description}`);
      console.info(`    ${command}${comment}`);
    });

    console.info();
  }
}

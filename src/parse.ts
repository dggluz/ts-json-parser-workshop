import chalk from 'chalk';
import { inspect } from 'util';
import { Parser } from '.';

export const parse = (parser: Parser<unknown>, input: string) => {
  parser(input)
    .then(({ result, remaining }) => {
      if (remaining) {
        console.log(`${chalk.bold('Remaining:')} ${chalk.blueBright.italic(remaining)}`);
      } else {
        console.log(chalk.bgBlueBright.italic('No hay ramaining'));
      }

      console.log(chalk.green.bold('Result: '), inspect(result, {
        depth: null,
        colors: true,
        breakLength: 40,
        compact: false,
      }));
    })
    .catch(err => console.error(
      chalk.bgMagenta.white.bold(err)
    ));
};

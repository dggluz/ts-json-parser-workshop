import watch from 'node-watch';
import { start, REPLServer } from 'repl';
import { resolve } from 'path';
import { readdir } from 'fs/promises';
// import * as chalk from 'chalk';

let loadedVariables: string[] = [];

const loadFile = (replServer: REPLServer) => (sourcePath: string) => {
  // require catches it's result. This is a hacky way of deleting that cache.
  delete require.cache[require.resolve(sourcePath)];

  try {
    const module = require(sourcePath);

    // console.log(chalk.greenBright(`Cargando código de "${sourcePath}"...`));

    Object.entries(module).forEach(([key, value]) => {
      if (!(key in replServer.context)) {
        loadedVariables.push(key);
        replServer.context[key] = value;
      }
    });
  } catch (e) {
    // console.error(chalk.redBright('No se pudo cargar el código porque tiene errores:'), e);
    console.error(e);
    return;
  }
};

const loadModule = async (replServer: REPLServer, modulePath: string) => {
  (await readdir(modulePath))
    .map(fileName => resolve(modulePath, fileName))
    .forEach(loadFile(replServer));
};

const resetContext = (replServer: REPLServer) => {
  console.log('Reiniciando REPL...');
  loadedVariables.forEach(key => {
    Reflect.deleteProperty(replServer.context, key);
  });

  loadedVariables = [];
};

const clearConsole = (replServer: REPLServer) => {
  replServer.clearBufferedCommand();
  // https://stackoverflow.com/a/10526817
  console.log('\x1b[2J\x1b[0f');
};

const main = async (buildDirectory: string) => {
  const replServer = start({
    useColors: true,
  }).on('exit', () => process.exit());

  // console.log(chalk.gray(`Cargando REPL para "${buildDirectory}"`));

  watch(buildDirectory, { recursive: true }, async (evt, name) => {
    console.log('%s cambió.', name);
  
    resetContext(replServer);

    clearConsole(replServer);

    await loadModule(replServer, buildDirectory);

    replServer.prompt();
  });

  await loadModule(replServer, buildDirectory);
  clearConsole(replServer);

  replServer.prompt();
};

const [, , buildDirectory] = process.argv;

if (!(buildDirectory || '').trim()) {
  throw new Error('Build directory incorrecto');
}

main(resolve(process.cwd(), buildDirectory));

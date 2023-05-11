export type Parser <T> = (input: string) => Promise<{
  result: T;
  remaining: string;
}>;

// No darle bola a esta función es sólo una función.
const ToDo = (message: string) => () => {
  throw new Error(`TODO: ${message}`);
};

/**
 * ####### Ejercicio 1 (ejemplo): fooParser #######
 * 
 * Implementar fooParser, de tipo Parser<'foo'>, que parsea el string "foo".
 * Si el input comienza con "foo", debe devolver una
 * Promise<{resolved: 'foo', remaining: string}>, donde el remaining es la
 * parte del input que viene después de "foo".
 * Si el input no comienza con "foo", debe devolver una Promise rejecteada con
 * un error descriptivo.
 */
export const fooParser: Parser<'foo'> = input => {
  const expected = 'foo';

  if (input.startsWith(expected)) {
    return Promise.resolve({
      result: expected,
      remaining: input.slice(expected.length),
    });
  }

  if (!input.length) {
    return Promise.reject(new Error(`Unexpected end of input. Expecting "${
      expected
    }"`));
  }

  if (input.length <= expected.length) {
    return Promise.reject(
      new Error(`Unexpected "${input}". Expecting "${expected}"`)
    );
  }

  return Promise.reject(
    new Error(`Unexpected "${
      input.slice(0, expected.length)
    }...". Expecting "${expected}"`)
  );
};

/**
 * ####### Ejercicio 2: fromStr #######
 * 
 * Implementar la función fromStr, que recibe un string y devuelve un Parser
 * de ese string.
 * 
 * Pista: copiar y pegar el código de fooParser, puede ser un buen comienzo.
 */
export const fromStr = <S extends string> (expected: S): Parser<S> =>
  ToDo('Implementar fromStr');

/**
 * ####### Ejercicio 2b: fooParser #######
 * 
 * Reimplementar el parser fooParser, delegando en la función fromStr.
 * Borrar la implementación de fooParser de más arriba, descomentar la
 * de la próxima lína de código y completar.
 */
// export const fooParser: Parser<'foo'> = ;

/**
 * ####### Ejercicio 3: map #######
 * 
 * Implementar la función map, que toma como parámetro una función y un Parser
 * y transforma el "result" del Parser, usando la función.
 * 
 * Pista 1: recordar que los Parsers son en sí mismos funciones que devuelven
 * una Promesa. Usar async/await puede ayudar.
 * 
 * Pista 2: en algún punto, tendremos que aplicar el parser que recibimos por
 * parámetro.
 */
export const map = <A, B> (fn: (x: A) => B, parser: Parser<A>): Parser<B> =>
  ToDo('Implementar map');

// No darle bola a esta función.
const ToDo = (message: string) => () => {
  throw new Error(`TODO: ${message}`);
};

// No darle bola a esta función de tipos.
type GetParserType <T> = T extends Parser<infer U> ? U : never;

// Ignorar también esta otra función de tipos (¡vaya que es fea!):
type Join<A, R extends string = ""> = A extends [infer First, ...infer Rest] ?
  Join<Rest, R extends ""
    ? `${First & string}`
    : `${R}${First & string}`>
  : R;

// ¡Y esta! Ignorarla con fuerza:
type ConcatAll <P extends Parser<string>[]> = Join<{
  [K in keyof P]: GetParserType<P[K]>
}>;


// ##########################################
// ### AHORA SÍ, DAR BOLA A PARTIR DE ACÁ ###
// ##########################################

/**
 * Un Parser es, antes que nada, algo que transforma un input en un output. Es
 * decir: un Parser es una FUNCIÓN. Y como el input es (para JSON) un string,
 * el parámetro de la función será un string. Hasta este punto, podemos afirmar
 * que un Parser es:
 * type Parser = (input: string) => unknown;
 * 
 * Ahora bien. Un Parser es un Parser "de algo". Es decir, su resultado, podrá
 * ser de algún tipo determinado. Pero ¿de qué tipo?: y... de alguno. Vamos a
 * parametrizar el tipo de Parser, para que pase a ser un Parser "de algo":
 * type Parser <T> = (input: string) => T;
 * 
 * Luego, nuestros Parsers pueden "fallar". Es decir, si hago
 * JSON.parse('hola'), desde luego que va a fallar, porque "hola" no es un JSON
 * válido. Ahora bien, hay muchas formas de representar que algo puede fallar.
 * Una forma de hacerlo (y es la que elegiremos), es usando Promise. Si el
 * resultado falla, será una Promise rechazada ("rejected", vamos). Si no
 * falla, será una Promise resulta (o "resolved"). En este punto, nuestro
 * Parser queda así:
 * type Parser <T> = (input: string) => Promise<T>;
 * 
 * Por último, nuestros Parsers, serán Parsers "chiquitos". Es decir, querremos
 * combinar varios Parsers chiquitos y simples para formar Parsers más grandes
 * y complejos. Por eso, para poder "enganchar" Parsers entre sí, cada Parser
 * deberá devolver no sólo su resultado (resultado de procesar una parte del
 * input), sino que también deberá devolver "el resto" del input (lo que no
 * procesó), para que puedan procesarlo Parsers subsiguientes.
 * Es así que obtenemos el tipo definitivo de nuestro Parser, que es:
 */
export type Parser <T> = (input: string) => Promise<{
  result: T;
  remaining: string;
}>;

/**
 * El objetivo final será implementar un Parser<JsonValue>. JsonValue
 * representa todos los tipos de valores válidos para JSON: null, booleanos,
 * strings, números, arrays y objetos. Como ven, es un tipo recursivo: podemos
 * tener arrays de objetos de arrays de objetos de objetos de arrays, y así.
 */
type JsonValue =
  | null
  | boolean
  | string
  | number
  | JsonValue[]
  | JsonObject
;
interface JsonObject {
  [key: string]: JsonValue;
}

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

/**
 * lift es el resultado de currificar map. Lo lindo que tiene es que recibe
 * una función (x: A) => B y "la eleva" para convertirla en una función que
 * trabaja con Parsers (es decir, en una (x: Parser<A>) => Parser<B>).
 * Este lindo concepto de la programación funcional lo vamos a usar más
 * adelante, con liftA2.
 */
export const liftA = <A, B> (fn: (x: A) => B) =>
  (parser: Parser<A>) =>
    map(fn, parser);

/**
 * ####### Ejercicio 4: nullParser #######
 * 
 * JSON está compuesto por varios valores: null, booleanos, strings, números,
 * arrays y objetos. Vamos a ir implementando los distintos Parsers de a uno y
 * en ese orden.
 * 
 * Combinando lo que ya hicimos, ¡estamos en condiciones de escribir un Parser
 * de null! El parser de null debe procesar el string "null" y devolver un
 * valor null (no un string, sino un valor cuyo tipo de dato sea null).
 */
export const nullParser: Parser<null> = ToDo('Implementar nullParser');

/**
 * ####### Ejercicio 5: alt #######
 * 
 * Ya hicimos el Parser de null, ¡buenísimo! El siguiente valor de JSON son los
 * booleanos, pero para hacer el Parser de booleanos, primero necesitamos hacer
 * la función alt.
 * 
 * alt es una función que recibe dos Parsers y que devuelve un Parser que
 * primero intenta parsear con ambos Parsers. Los prueba en orden, si alguno
 * funciona, devuelve ese resultado. Si ambos fallan, el Parser resultante
 * también falla.
 * 
 * Pista: usar async/await puede volver a ser de ayuda.
 */
export const alt = <A, B> (
  parserA: Parser<A>,
  parserB: Parser<B>,
): Parser<A | B> => ToDo('Implementar alt');

/**
 * ####### Ejercicio 6: booleanParser #######
 * 
 * Ahora sí, con ayuda de alt, de map y de fromStr, ¡podemos implementar
 * booleanParser!
 */
export const booleanParser: Parser<boolean> = ToDo('Implementar booleanParser');

/**
 * ####### Ejercicio 7: jsonParser #######
 * 
 * Ya podemos parsear nulls y booleanos. ¿Y si los combinamos para armar
 * nuestro primer jsonParser?
 * 
 * Implementar jsonParser e ir agregándole los Parsers correspondientes a
 * medida de que los vayamos haciendo.
 */
export const jsonParser: Parser<JsonValue> = ToDo(
  'Implementar jsonParser (sólo con nulls y booleanos, por ahora)'
);

/**
 * ####### Ejercicio 8: altAll #######
 * 
 * Buenísmo, ya combinamos el Parser de null y el Parser de booleanos para
 * obtener nuestra primer versión del jsonParser. Pero, a medida de que le
 * agreguemos más Parsers, sería lindo contar con una versión variádica de alt
 * (es decir, generalizada para cualquier cantidad de argumentos).
 * 
 * Pista: tiene algo de parecido a hacer una sumatoria, o a implementar el
 * Array.some.
 */
export const altAll = <P extends Parser<any>[]> (
  ...parsers: P
): Parser<GetParserType<P[number]>> => ToDo('Implementar altAll');

/**
 * ####### Ejercicio 9: concat #######
 * 
 * alt no es la única forma en la que podemos combinar dos Parsers. Podemos,
 * por ejemplo, hacer concat, que va a recibir dos Parsers de string y devolver
 * un nuevo Parser, de la concatenación de los strings originales. Por ejemplo,
 * concat(fromStr('foo'), fromStr('bar')), debería devolvernos un
 * Parser<'foobar'>. ¡Implementemos concat!
 * 
 * Pista: usar async/await puede ser nuevamente de ayuda.
 * 
 * Pista2: si "encadenamos" dos Parsers (y es lo que queremos hacer), el output
 * del primer Parser, tendrá que ser el input del siguiente.
 */
export const concat = <A extends string, B extends string> (
  parserA: Parser<A>,
  parserB: Parser<B>,
): Parser<`${A}${B}`> => ToDo('Implementar concat');

/**
 * ####### Ejercicio 10: concatAll #######
 * 
 * Así como generalizamos alt en altAll, haciéndola variádica, podemos
 * generalizar concat en concatAll, haciéndola variádica. Implementemos,
 * entonces, concatAll.
 * 
 * Pista: será muy parecida a altAll.
 * 
 * Bonus: el tipo de retorno de concatAll es Parser<string>. Pero podemos
 * convertirlo en algo mucho más potente, si "le clavamos" un:
 * as Parser<ConcatAll<P>>
 * 
 * Sí, lamentablemente deberemos usar "as" en este caso. El tipo ConcatAll
 * está definido más arriba y nos permite que hacer
 * concatAll(fromStr('foo'), fromStr('bar'), fromStr('baz')), nos devuelva un
 * Parser<'foobarbaz'>, concatenando una cantidad arbitraria de strings
 * literales.
 * 
 * En cualquier caso, dejar el retorno como Parser<string> también es válido.
 */
export const concatAll = <P extends Parser<string>[]> (...parsers: P) =>
  ToDo('Implementar concatAll');

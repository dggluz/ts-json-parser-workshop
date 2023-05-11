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
 * liftA es el resultado de currificar map. Lo lindo que tiene es que recibe
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

/**
 * ####### Ejercicio 11: map2 #######
 * 
 * Así como hicimos map, que toma una función (x: A) => B y una Parser<A>, y
 * nos devuelve un Parser<B>, podemos generalizar esa abstracción a otro
 * parámetro. Es decir: recibir una función de DOS parámetros (en lugar de
 * uno): fn será (x: A, y: B) => C
 * 
 * Luego, recibimos también dos Parsers: Parser<A> y Parser<B> y devolvemos
 * Parser<C>.
 * 
 * map2 será vital de acá en más para construir Parsers.
 * 
 * Pista: partir de la implementación de concat, puede ser una buena idea.
 * Debemos mantener la misma idea de "encadenar" los Parsers.
 */
export const map2 = <A, B, C> (
  fn: (x: A, y: B) => C,
  parserA: Parser<A>,
  parserB: Parser<B>,
): Parser<C> => ToDo('Implementar map2');

/**
 * Así como liftA "eleva" una función de un parámetro, liftA2 hace lo propio
 * con funciones de dos parámetros. Esta función nos va a resultar
 * tremendamente poderosa. Como muestra, basta hacer el ejercicio 11.b.
 */
export const liftA2 = <A, B, C> (
  fn: (x: A, y: B) => C,
) => (
  parserA: Parser<A>,
  parserB: Parser<B>,
): Parser<C> => map2(fn, parserA, parserB);

/**
 * ####### Ejercicio 11.b: reimplementar concat #######
 * 
 * Reimplementar concat, usando liftA2. Descomentá la siguiente línea de
 * código, completala y borrá la implementación de concat de más arriba.
 * 
 * Pista: dejate llevar por la abstracción. Si podés hacer una función
 * (x: A, y: B) => C, hacer una (x: Parser<A>, y: Parser<B>) => Parser<C>
 * debería ser una pavada.
 */
// const concat = ;

/**
 * ####### Ejercicio 12: keepLeft #######
 * 
 * Ahora, vamos a implementar keepLeft, que recibe dos Parsers, los "engancha"
 * y devuelve un Parser cuyo resultado es el del primer Parser. Es decir:
 * keepLeft(fromStr('foo'), fromStr('bar')), debe devolver Parser<'foo'>, PERO
 * que "consuma" el texto "foobar" del input.
 * 
 * Pista: liftA2 es una función muy poderosa.
 */
export const keepLeft = ToDo('Implement keepLeft');

/**
 * ####### Ejercicio 13: keepRight #######
 * 
 * El nombre lo dice todo: keepRight es como keepLeft, pero devuelve el
 * resultado del segundo Parser, y no el primero.
 */
export const keepRight = ToDo('Implement keepRight');

/**
 * ####### Ejercicio 14: keepMiddle #######
 * 
 * keepMiddle nos será muy útil muy pronto. Hace lo que el nombre (y el tipo de
 * datos) dice: recibirá 3 Parsers, los "enganchará" entre sí, y devolverá el
 * resultado del segundo.
 */
export const keepMiddle = <L, M, R> (
  left: Parser<L>,
  middle: Parser<M>,
  right: Parser<R>,
): Parser<M> => ToDo('Implement keepMiddle');

/**
 * ####### Ejercicio 15: regexStar & regexPlus #######
 * 
 * Acá es donde la cosa se pone muy linda. Vamos a implementar dos funciones:
 * regexStar y regexPlus, llamadas así por su analogía con los correspondientes
 * operadores en las expresiones regulares (*, también conocido como estrella
 * de Kleene o simplemente "operador estralla", y +, conocido sólamente como
 * "operador suma").
 * 
 * regexStar, recibirá un Parser<string> y devolverá un Parser<string>, que
 * parsea de 0 a infinitas veces el string original. Por ejemplo:
 * regexStar(fromStr('foo')), devolverá un Parser que podrá procesar el string
 * vacío, el string "foo", el string "foofoo", el string "foofoofoo", y así.
 * 
 * regexPlus hará exactamente lo mismo que regexStar, pero no podrá procesar el
 * string vacío.
 * 
 * Pista: implementarl estas funciones por separado es muy difícil, pero
 * implementarlas juntas es sencillo (implementar cada una, asumiendo que
 * existe la otra). Es decir: son funciones mutuamente recursivas. 🤯🤯🤯🤯🤯
 * 
 * Pista 2: si caes en una recursión infinita, no desesperes, vas por el buen
 * camino. La conversión-η (o "conversión eta") puede ser muy útil para salir
 * de esta recursión infinita.
 */
export const regexStar = (parser: Parser<string>): Parser<string> =>
  ToDo('Implement regexStar');

export const regexPlus = (parser: Parser<string>): Parser<string> =>
  ToDo('Implement regexPlus');

/**
 * ####### Ejercicio 16: charParser #######
 * 
 * Vamos a hacer un Parser de un sólo caracter. Es muy sencillo: consume sólo
 * un caracter, cualquiera sea. Si el input es un string vacío, falla.
 * 
 * Pista: volver a lo básico.
 */
export const charParser: Parser<string> = ToDo('Implement charParser');

/**
 * ####### Ejercicio 17: normalCharParser #######
 * 
 * Ya estamos encaminados para hacer nuestro sigueinte Parser de un valor de
 * JSON: el Parser de string. Pero antes, vamos a tener que procesar de un modo
 * diferenciado a los caracteres "normales" y los especiales. A los fines de
 * este ejercicio, vamos a considerar que los caracteres especiales son
 * únicamente las comillas dobles (") y la contrabarra (\). Hagamos, pues,
 * normalCharParser, que es un Parser de un solo caracter, pero ese caracter
 * debe ser "normal" (es decir, "no especial").
 * 
 * Pista: un detalle de implementación de map puede ser de mucha ayuda.
 * 
 * Pista 2: escapar el caracter contrabarra (\) requiere utilizar una
 * contrabarra extra. En general, en el código, siempre vas a ver las
 * contrabarras de a dos.
 */
export const normalCharParser: Parser<string> = ToDo(
  'Implement normalCharParser'
);

/**
 * ####### Ejercicio 18: escapedCharParser #######
 * 
 * Así como hicimos nuestro normalCharParser, tendremos que hacer un
 * escapedCharParser que, básicamente, puede procesar (solamente) los
 * caracteres especiales, PERO ESCAPADOS. Recordar que los caracteres
 * especiales son (para el ejercicio) la comilla doble (") y la contrabarra.
 * 
 * Es decir, nuestro parser debe poder procesar \" y \\. PERO el resultado debe
 * ser el caracter sin escapar.
 * 
 * Pista: divide y reinarás.
 * 
 * Pista 2: recuerden que escapar el caracter contrabarra (\) requiere utilizar
 * una contrabarra extra.
 */
export const escapedCharParser: Parser<string> = ToDo(
  'Implement escapedCharParser'
);

/**
 * ####### Ejercicio 19: stringParser #######
 * 
 * Finalmente, ¡estamos en condiciones de hacer nuestro stringParser!
 * 
 * Recordar que en JSON, un string es un texto arbitrario que está entre dos
 * comillas dobles (").
 * 
 * Pista: un texto arbitrario, serían cero o más caracteres normales o
 * correctamente escapados.
 */
export const stringParser = ToDo('Implement stringParser');

/**
 * ####### Ejercicio 20: digitParser #######
 * 
 * Lo que sigue sería hacer el Parser de números, pero vamos a hacerlo de a
 * poquitos. Comenzaremos haciendo un Parser de un dígito numérico (0, 1, 2, 3,
 * 4, 5, 6, 7, 8 o 9).
 */
export const digitParser = ToDo('Implement digitParser');

/**
 * ####### Ejercicio 21: digitsParser #######
 * 
 * Vamos pasito a pasito. El digitsParser es como el digitParser, pero en
 * plural. Es decir, parsea 1 o más dígitos.
 */
export const digitsParser = ToDo('Implement digitsParser');

/**
 * ####### Ejercicio 22: numberParser #######
 * 
 * Con lo que vimos, ya podemos hacer nuestro numberParser. Eso sí: es un
 * numberParser humilde y SÓLO SOPORTAREMOS NÚMEROS NATURALES (y en la
 * notación cardinal habitual, la de toda la vida).
 * 
 * Sí: nuestro Parser es humilde, pero como tarea para el hogar, puede quedar
 * implementar los números negativos, los fraccionales y las distintas
 * notaciones posibles.
 */
export const numberParser = ToDo('Implement numberParser');

import { fromStr, map2 } from '../src';

describe('map2 parsers', () => {
  describe('vesreParser', () => {
    it('Parses "foobar"', async () => {
      // GIVEN:
      // A "foo" parser,
      const fooParser = fromStr('foo');
      // ...a "bar" parser,
      const barParser = fromStr('bar');
      // ...a "vesreParser", that invert the previous ones
      const vesreParser = map2(
        <S extends string, T extends string> (
          x: S,
          y: T,
        ): `${T}${S}` => `${y}${x}`,
        fooParser,
        barParser,
      );
      // ...and the "foobar" input
      const input = 'foobar';
  
      // WHEN:
      // Parsing the input with the vesreParser
      const { result, remaining } = await vesreParser(input);
  
      // THEN:
      // The result is the "barfoo" string
      expect(result).toBe('barfoo');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });

    it('Parses "foobar" with extra text', async () => {
      // GIVEN:
      // A "foo" parser,
      const fooParser = fromStr('foo');
      // ...a "bar" parser,
      const barParser = fromStr('bar');
      // ...a "vesreParser", that invert the previous ones
      const vesreParser = map2(
        <S extends string, T extends string> (
          x: S,
          y: T,
        ): `${T}${S}` => `${y}${x}`,
        fooParser,
        barParser,
      );
      // ...and the "foobarABC" input, with extra text
      const input = 'foobarABC';
  
      // WHEN:
      // Parsing the input with the vesreParser
      const { result, remaining } = await vesreParser(input);
  
      // THEN:
      // The result is the "barfoo" string
      expect(result).toBe('barfoo');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });

    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "foo" parser,
        const fooParser = fromStr('foo');
        // ...a "bar" parser,
        const barParser = fromStr('bar');
        // ...a "vesreParser", that invert the previous ones
        const vesreParser = map2(
          <S extends string, T extends string> (
            x: S,
            y: T,
          ): `${T}${S}` => `${y}${x}`,
          fooParser,
          barParser,
        );
        // ...and the empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the vesreParser
        await vesreParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected end of input. Expecting "foo"');
        } else {
          throw e;
        }
      }
    });

    it('Fails if the "bar" string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "foo" parser,
        const fooParser = fromStr('foo');
        // ...a "bar" parser,
        const barParser = fromStr('bar');
        // ...a "vesreParser", that invert the previous ones
        const vesreParser = map2(
          <S extends string, T extends string> (
            x: S,
            y: T,
          ): `${T}${S}` => `${y}${x}`,
          fooParser,
          barParser,
        );
        // ...and the "bar" string input
        const input = 'bar';
    
        // WHEN:
        // Parsing the input with the vesreParser
        await vesreParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "bar". Expecting "foo"');
        } else {
          throw e;
        }
      }
    });

    it('Fails if a long string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "foo" parser,
        const fooParser = fromStr('foo');
        // ...a "bar" parser,
        const barParser = fromStr('bar');
        // ...a "vesreParser", that invert the previous ones
        const vesreParser = map2(
          <S extends string, T extends string> (
            x: S,
            y: T,
          ): `${T}${S}` => `${y}${x}`,
          fooParser,
          barParser,
        );
        // ...and a long string input
        const input = 'loooooong';
    
        // WHEN:
        // Parsing the input with the vesreParser
        await vesreParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "loo...". Expecting "foo"');
        } else {
          throw e;
        }
      }
    });
  });
});

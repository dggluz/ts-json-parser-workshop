import { fromStr, map } from "../src";

describe.skip('map parsers', () => {
  describe('UpperCased "foo" parser', () => {
    it('Parses "foo"', async () => {
      // GIVEN:
      // A "foo" parser,
      const fooParser = fromStr('foo');
      // ...that is mapped for upperCasing its result
      const fooUpperCasedParser = map(x => x.toUpperCase(), fooParser);
      // ...and the "foo" input
      const input = 'foo';
  
      // WHEN:
      // Parsing the input with the fooUpperCasedParser
      const { result, remaining } = await fooUpperCasedParser(input);
  
      // THEN:
      // The result is the "FOO" (upperCased) string
      expect(result).toBe('FOO');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });

    it('Parses "foo" with extra text', async () => {
      // GIVEN:
      // A "foo" parser,
      const fooParser = fromStr('foo');
      // ...that is mapped for upperCasing its result
      const fooUpperCasedParser = map(x => x.toUpperCase(), fooParser);
      // ...and the "foo" input, with extra text ("ABC")
      const input = 'fooABC';
  
      // WHEN:
      // Parsing the input with the fooUpperCasedParser
      const { result, remaining } = await fooUpperCasedParser(input);
  
      // THEN:
      // The result is the "foo" string
      expect(result).toBe('FOO');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });

    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "foo" parser,
        const fooParser = fromStr('foo');
        // ...that is mapped for upperCasing its result
        const fooUpperCasedParser = map(x => x.toUpperCase(), fooParser);
        // ...and the empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the fooUpperCasedParser
        await fooUpperCasedParser(input);
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
        // ...that is mapped for upperCasing its result
        const fooUpperCasedParser = map(x => x.toUpperCase(), fooParser);
        // ...and the "bar" string input
        const input = 'bar';
    
        // WHEN:
        // Parsing the input with the fooUpperCasedParser
        await fooUpperCasedParser(input);
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
        // ...that is mapped for upperCasing its result
        const fooUpperCasedParser = map(x => x.toUpperCase(), fooParser);
        // ...and a long string input
        const input = 'loooooong';
    
        // WHEN:
        // Parsing the input with the fooUpperCasedParser
        await fooUpperCasedParser(input);
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

  describe('"foo" parser that outputs "bar"', () => {
    it('Parses "foo"', async () => {
      // GIVEN:
      // A "foo" parser,
      const fooParser = fromStr('foo');
      // ...that is mapped for outputting "bar"
      const impostorParser = map(() => 'bar', fooParser);
      // ...and the "foo" input
      const input = 'foo';
  
      // WHEN:
      // Parsing the input with the impostorParser
      const { result, remaining } = await impostorParser(input);
  
      // THEN:
      // The result is the "bar" string
      expect(result).toBe('bar');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });

    it('Parses "foo" with extra text', async () => {
      // GIVEN:
      // A "foo" parser,
      const fooParser = fromStr('foo');
      // ...that is mapped for outputting "bar"
      const impostorParser = map(() => 'bar', fooParser);
      // ...and the "foo" input, with extra text ("ABC")
      const input = 'fooABC';
  
      // WHEN:
      // Parsing the input with the impostorParser
      const { result, remaining } = await impostorParser(input);
  
      // THEN:
      // The result is the "bar" string
      expect(result).toBe('bar');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });

    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "foo" parser,
        const fooParser = fromStr('foo');
        // ...that is mapped for outputting "bar"
        const impostorParser = map(() => 'bar', fooParser);
        // ...and the empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the impostorParser
        await impostorParser(input);
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
        // ...that is mapped for outputting "bar"
        const impostorParser = map(() => 'bar', fooParser);
        // ...and the "bar" string input
        const input = 'bar';
    
        // WHEN:
        // Parsing the input with the impostorParser
        await impostorParser(input);
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
        // ...that is mapped for outputting "bar"
        const impostorParser = map(() => 'bar', fooParser);
        // ...and a long string input
        const input = 'loooooong';
    
        // WHEN:
        // Parsing the input with the impostorParser
        await impostorParser(input);
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

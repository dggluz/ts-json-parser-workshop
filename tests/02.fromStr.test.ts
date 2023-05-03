import { fromStr } from '../src';

describe.skip('fromStr parser constuctor', () => {
  describe('"bar" parser', () => {
    it('Parses "bar"', async () => {
      // GIVEN:
      // A "bar" parser
      const barParser = fromStr('bar');
      // ...and the "bar" input
      const input = 'bar';
  
      // WHEN:
      // Parsing the input with the barParser
      const { result, remaining } = await barParser(input);
  
      // THEN:
      // The result is the "bar" string
      expect(result).toBe('bar');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });

    it('Parses "bar" with extra text', async () => {
      // GIVEN:
      // A "bar" parser
      const barParser = fromStr('bar');
      // ...and the "bar" input, with extra text ("ABC")
      const input = 'barABC';
  
      // WHEN:
      // Parsing the input with the barParser
      const { result, remaining } = await barParser(input);
  
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
        // A "bar" parser
        const barParser = fromStr('bar');
        // ...and the empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the barParser
        await barParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected end of input. Expecting "bar"');
        } else {
          throw e;
        }
      }
    });

    it('Fails if the "foo" string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "bar" parser
        const barParser = fromStr('bar');
        // ...and the "foo" string input
        const input = 'foo';
    
        // WHEN:
        // Parsing the input with the barParser
        await barParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "foo". Expecting "bar"');
        } else {
          throw e;
        }
      }
    });

    it('Fails if a long string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "bar" parser
        const barParser = fromStr('bar');
        // ...and a long string input
        const input = 'loooooong';
    
        // WHEN:
        // Parsing the input with the barParser
        await barParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "loo...". Expecting "bar"');
        } else {
          throw e;
        }
      }
    });
  });

  describe('"baz" parser', () => {
    it('Parses "baz"', async () => {
      // GIVEN:
      // A "baz" parser
      const bazParser = fromStr('baz');
      // ...and the "baz" input
      const input = 'baz';
  
      // WHEN:
      // Parsing the input with the bazParser
      const { result, remaining } = await bazParser(input);
  
      // THEN:
      // The result is the "baz" string
      expect(result).toBe('baz');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });

    it('Parses "baz" with extra text', async () => {
      // GIVEN:
      // A "baz" parser
      const bazParser = fromStr('baz');
      // ...and the "baz" input, with extra text ("ABC")
      const input = 'bazABC';
  
      // WHEN:
      // Parsing the input with the bazParser
      const { result, remaining } = await bazParser(input);
  
      // THEN:
      // The result is the "baz" string
      expect(result).toBe('baz');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });

    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "baz" parser
        const bazParser = fromStr('baz');
        // ...and the empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the bazParser
        await bazParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected end of input. Expecting "baz"');
        } else {
          throw e;
        }
      }
    });

    it('Fails if the "foo" string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "baz" parser
        const bazParser = fromStr('baz');
        // ...and the "foo" string input
        const input = 'foo';
    
        // WHEN:
        // Parsing the input with the bazParser
        await bazParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "foo". Expecting "baz"');
        } else {
          throw e;
        }
      }
    });

    it('Fails if a long string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // A "baz" parser
        const bazParser = fromStr('baz');
        // ...and a long string input
        const input = 'loooooong';
    
        // WHEN:
        // Parsing the input with the bazParser
        await bazParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "loo...". Expecting "baz"');
        } else {
          throw e;
        }
      }
    });
  });
});

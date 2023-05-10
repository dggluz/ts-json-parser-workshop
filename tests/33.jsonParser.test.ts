import { jsonParser } from '../src';

describe.skip('jsonParser', () => {
  describe('jsonParser parses null', () => {
    it('Parses "null"', async () => {
      // GIVEN:
      // The "null" input
      const input = 'null';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the null value
      expect(result).toBe(null);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses "null" with extra text', async () => {
      // GIVEN:
      // The "null" input, with extra text ("ABC")
      const input = 'nullABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the null value
      expect(result).toBe(null);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  
    it('Fails if the "bar" string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The "bar" string input
        const input = 'bar';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe('jsonParser parses boolean', () => {
    it('Parses "true"', async () => {
      // GIVEN:
      // The "true" input
      const input = 'true';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the true value
      expect(result).toBe(true);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses "false"', async () => {
      // GIVEN:
      // The "false" input
      const input = 'false';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the false value
      expect(result).toBe(false);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses "true" with extra text', async () => {
      // GIVEN:
      // The "true" input, with extra text ("ABC")
      const input = 'trueABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the true value
      expect(result).toBe(true);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses "false" with extra text', async () => {
      // GIVEN:
      // The "false" input, with extra text ("ABC")
      const input = 'falseABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the false value
      expect(result).toBe(false);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe('jsonParser parses string', () => {
    it('Parses ""', async () => {
      // GIVEN:
      // The """" input
      const input = '""';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the empty string
      expect(result).toBe('');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses a string', async () => {
      // GIVEN:
      // The ""some string"" input
      const input = '"some string"';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the "some string" string
      expect(result).toBe('some string');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses a string with escaped special characters', async () => {
      // GIVEN:
      // The a string with escaped special characters input
      const input = '"I like \\"quoting\\" things and backslashes (\\\\)"';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the "I like "quoting" things and backslashes (\)" string
      expect(result).toBe('I like "quoting" things and backslashes (\\)');
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses ""', async () => {
      // GIVEN:
      // The """" input, with extra text ("ABC")
      const input = '""ABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the empty string
      expect(result).toBe('');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses a string', async () => {
      // GIVEN:
      // The ""some string"" input, with extra text ("ABC")
      const input = '"some string"ABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the "some string" string
      expect(result).toBe('some string');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses a string with escaped special characters', async () => {
      // GIVEN:
      // The a string with escaped special characters input, with extra text ("ABC")
      const input = '"I like \\"quoting\\" things and backslashes (\\\\)"ABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the "I like "quoting" things and backslashes (\)" string
      expect(result).toBe('I like "quoting" things and backslashes (\\)');
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected end of input. Expecting "{"');
        } else {
          throw e;
        }
      }
    });
  
    it('Fails if the input does not start with quote', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The "foo" input
        const input = 'foo';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message)
            .toEqual('Unexpected "f...". Expecting "{"');
        } else {
          throw e;
        }
      }
    });
  
    it('Fails if the input does not end with quote', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The ""foo" input 
        const input = '"foo';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  
    it('Fails if the special chars are not escaped', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The "fo\\o" input
        const input = '"fo\\o"';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe('jsonParser parses numbers', () => {
    it('Parses "1234567890"', async () => {
      // GIVEN:
      // The "1234567890" input
      const input = '1234567890';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the 1234567890 number
      expect(result).toBe(1234567890);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses "1234567890" with extra text', async () => {
      // GIVEN:
      // The "1234567890" input, with extra text ("ABC")
      const input = '1234567890ABC';
  
      // WHEN:
      // Parsing the input with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the 1234567890 number
      expect(result).toBe(1234567890);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Fails if an empty string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The empty string input
        const input = '';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  
    it('Fails if the other string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The "foo" string input
        const input = 'foo';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe('jsonParser parses arrays', () => {
    it('Parses the empty array', async () => {
      // GIVEN:
      // The stringified empty array input
      const input = '[]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the empty array
      expect(result).toEqual([]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the nulls array', async () => {
      // GIVEN:
      // The stringified array of nulls input
      const input = '[ null, null, null ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of nulls
      expect(result).toEqual([ null, null, null ]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the nulls array', async () => {
      // GIVEN:
      // The stringified array of nulls input
      const input = '[ null, null, null ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of nulls
      expect(result).toEqual([ null, null, null ]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the booleans array', async () => {
      // GIVEN:
      // The stringified array of booleans input
      const input = '[ false, true ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of booleans
      expect(result).toEqual([ false, true ]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the strings array', async () => {
      // GIVEN:
      // The stringified array of strings input
      const input = '[ "foo", "bar", "baz" ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of strings
      expect(result).toEqual([ 'foo', 'bar', 'baz' ]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the numbers array', async () => {
      // GIVEN:
      // The stringified array of numbers input
      const input = '[ 1, 2, 3 ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of numbers
      expect(result).toEqual([ 1, 2, 3 ]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the arrays of arrays', async () => {
      // GIVEN:
      // The stringified array of arrays input
      const input = '[ [], [] ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of arrays
      expect(result).toEqual([ [], [] ]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses mixed arrays', async () => {
      // GIVEN:
      // The stringified array of mixed values input
      const input = '[ null, true, "foo", 1, [false, "bar", 2] ]';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of mixed values
      expect(result).toEqual([ null, true, 'foo', 1, [false, 'bar', 2]]);
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses the empty array, with extra text', async () => {
      // GIVEN:
      // The stringified empty array input, with extra text ("ABC")
      const input = '[]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the empty array
      expect(result).toEqual([]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses the nulls array, with extra text', async () => {
      // GIVEN:
      // The stringified array of nulls input, with extra text ("ABC")
      const input = '[ null, null, null ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of nulls
      expect(result).toEqual([ null, null, null ]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses the nulls array, with extra text', async () => {
      // GIVEN:
      // The stringified array of nulls input, with extra text ("ABC")
      const input = '[ null, null, null ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of nulls
      expect(result).toEqual([ null, null, null ]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses the booleans array, with extra text', async () => {
      // GIVEN:
      // The stringified array of booleans input, with extra text ("ABC")
      const input = '[ false, true ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of booleans
      expect(result).toEqual([ false, true ]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses the strings array, with extra text', async () => {
      // GIVEN:
      // The stringified array of strings input, with extra text ("ABC")
      const input = '[ "foo", "bar", "baz" ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of strings
      expect(result).toEqual([ 'foo', 'bar', 'baz' ]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses the numbers array, with extra text', async () => {
      // GIVEN:
      // The stringified array of numbers input, with extra text ("ABC")
      const input = '[ 1, 2, 3 ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of numbers
      expect(result).toEqual([ 1, 2, 3 ]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses the arrays of arrays, with extra text', async () => {
      // GIVEN:
      // The stringified array of arrays input, with extra text ("ABC")
      const input = '[ [], [] ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of arrays
      expect(result).toEqual([ [], [] ]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses mixed arrays, with extra text', async () => {
      // GIVEN:
      // The stringified array of mixed values input, with extra text ("ABC")
      const input = '[ null, true, "foo", 1, [false, "bar", 2] ]ABC';
  
      // WHEN:
      // Calling the jsonParser with the input
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is the array of mixed values
      expect(result).toEqual([ null, true, 'foo', 1, [false, 'bar', 2]]);
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  });

  describe('jsonParser parses object', () => {
    it('Parses an empty object', async () => {
      // GIVEN:
      // A stringified empty object input
      const input = '{ }';
  
      // WHEN:
      // Parsing it with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is an empty object
      expect(result).toEqual({});
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses a complex object', async () => {
      // GIVEN:
      // A stringified complex object input
      const input = '{ "foo": [null, false, 123], "bar": { "baz": true } }';
  
      // WHEN:
      // Parsing it with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is a complex object
      expect(result).toEqual({
        foo: [null, false, 123],
        bar: {
          baz: true,
        },
      });
      // ...and the remaining is the empty string
      expect(remaining).toBe('');
    });
  
    it('Parses an empty object, with extra text', async () => {
      // GIVEN:
      // A stringified empty object input, with extra text ("ABC")
      const input = '{}ABC';
  
      // WHEN:
      // Parsing it with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is a complex object
      expect(result).toEqual({});
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Parses a complex object, with extra text', async () => {
      // GIVEN:
      // A stringified complex object input, with extra text ("ABC")
      const input = '{ "foo": [null, false, 123], "bar": { "baz": true } }ABC';
  
      // WHEN:
      // Parsing it with the jsonParser
      const { result, remaining } = await jsonParser(input);
  
      // THEN:
      // The result is a complex object
      expect(result).toEqual({
        foo: [null, false, 123],
        bar: {
          baz: true,
        },
      });
      // ...and the remaining is the "ABC" string
      expect(remaining).toBe('ABC');
    });
  
    it('Fails if the "baz" string is supplied', async () => {
      expect.assertions(1);
      try {
        // GIVEN:
        // The "baz" string input
        const input = 'baz';
    
        // WHEN:
        // Parsing the input with the jsonParser
        await jsonParser(input);
      } catch (e) {
        // THEN:
        // The parsing fails
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
});

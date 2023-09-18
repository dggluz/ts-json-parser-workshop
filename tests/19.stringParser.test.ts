import { stringParser } from '../src';

describe('stringParser', () => {
  it('Parses ""', async () => {
    // GIVEN:
    // The """" input
    const input = '""';

    // WHEN:
    // Parsing the input with the stringParser
    const { result, remaining } = await stringParser(input);

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
    // Parsing the input with the stringParser
    const { result, remaining } = await stringParser(input);

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
    // Parsing the input with the stringParser
    const { result, remaining } = await stringParser(input);

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
    // Parsing the input with the stringParser
    const { result, remaining } = await stringParser(input);

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
    // Parsing the input with the stringParser
    const { result, remaining } = await stringParser(input);

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
    // Parsing the input with the stringParser
    const { result, remaining } = await stringParser(input);

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
      // Parsing the input with the stringParser
      await stringParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting """');
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
      // Parsing the input with the stringParser
      await stringParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "f...". Expecting """');
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
      // Parsing the input with the stringParser
      await stringParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting """');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the special chars are not escaped', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The "fo\\o" input
      const input = '"fo\\o"';
  
      // WHEN:
      // Parsing the input with the stringParser
      await stringParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "\\...". Expecting """');
      } else {
        throw e;
      }
    }
  });
});

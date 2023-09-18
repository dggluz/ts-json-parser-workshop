import { nullParser } from '../src';

describe('nullParser', () => {
  it('Parses "null"', async () => {
    // GIVEN:
    // The "null" input
    const input = 'null';

    // WHEN:
    // Parsing the input with the nullParser
    const { result, remaining } = await nullParser(input);

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
    // Parsing the input with the nullParser
    const { result, remaining } = await nullParser(input);

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
      // Parsing the input with the nullParser
      await nullParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "null"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the "bar" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The "bar" string input
      const input = 'bar';
  
      // WHEN:
      // Parsing the input with the nullParser
      await nullParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "bar". Expecting "null"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if a long string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the nullParser
      await nullParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "looo...". Expecting "null"');
      } else {
        throw e;
      }
    }
  });
});

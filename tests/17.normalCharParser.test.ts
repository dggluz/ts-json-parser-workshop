import { normalCharParser } from '../src';

describe.skip('normalCharParser', () => {
  it('Parses "f"', async () => {
    // GIVEN:
    // The "f" input
    const input = 'f';

    // WHEN:
    // Parsing the input with the normalCharParser
    const { result, remaining } = await normalCharParser(input);

    // THEN:
    // The result is the "f" string
    expect(result).toBe('f');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "f" with extra text', async () => {
    // GIVEN:
    // The "f" input, with extra text ("oo")
    const input = 'foo';

    // WHEN:
    // Parsing the input with the normalCharParser
    const { result, remaining } = await normalCharParser(input);

    // THEN:
    // The result is the "f" string
    expect(result).toBe('f');
    // ...and the remaining is the "oo" string
    expect(remaining).toBe('oo');
  });

  it('Fails if an empty string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the normalCharParser
      await normalCharParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting character.');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the quotes char (""") is suppied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The quotes string input
      const input = '"';
  
      // WHEN:
      // Parsing the input with the normalCharParser
      await normalCharParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected """. Expecting normal character.');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the backslash char ("\\") is suppied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The backslash string input
      const input = '\\';
  
      // WHEN:
      // Parsing the input with the normalCharParser
      await normalCharParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "\\". Expecting normal character.');
      } else {
        throw e;
      }
    }
  });
});

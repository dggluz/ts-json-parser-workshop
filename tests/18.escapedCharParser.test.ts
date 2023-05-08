import { escapedCharParser } from '../src';

describe.skip('escapedCharParser', () => {
  it('Parses the escaped quote ("\\"")', async () => {
    // GIVEN:
    // The the escaped quote ("\"") input
    const input = '\\"';

    // WHEN:
    // Parsing the input with the escapedCharParser
    const { result, remaining } = await escapedCharParser(input);

    // THEN:
    // The result is the quote (""") string
    expect(result).toBe('"');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the escaped quote ("\\"") with extra text', async () => {
    // GIVEN:
    // The the escaped quote ("\"") input, with extra text ("ABC")
    const input = '\\"ABC';

    // WHEN:
    // Parsing the input with the escapedCharParser
    const { result, remaining } = await escapedCharParser(input);

    // THEN:
    // The result is the quote (""") string
    expect(result).toBe('"');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the escaped backslash ("\\\\")', async () => {
    // GIVEN:
    // The escaped backslash ("\\") input
    const input = '\\\\';

    // WHEN:
    // Parsing the input with the escapedCharParser
    const { result, remaining } = await escapedCharParser(input);

    // THEN:
    // The result is the backslash ("\") string
    expect(result).toBe('\\');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the escaped quote ("\\"") with extra text', async () => {
    // GIVEN:
    // The escaped backslash ("\\ABC") input, with extra text ("ABC")
    const input = '\\\\ABC';

    // WHEN:
    // Parsing the input with the escapedCharParser
    const { result, remaining } = await escapedCharParser(input);

    // THEN:
    // The result is the backslash ("\") string
    expect(result).toBe('\\');
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
      // Parsing the input with the escapedCharParser
      await escapedCharParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "\\\\"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if a non-special char is suppied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The "f" input
      const input = 'f';
  
      // WHEN:
      // Parsing the input with the escapedCharParser
      await escapedCharParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "f". Expecting "\\\\"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if only one backslash char ("\\") is suppied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The backslash string input
      const input = '\\';
  
      // WHEN:
      // Parsing the input with the escapedCharParser
      await escapedCharParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "\\". Expecting "\\\\"');
      } else {
        throw e;
      }
    }
  });
});

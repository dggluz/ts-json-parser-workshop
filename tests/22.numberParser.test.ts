import { numberParser } from '../src';

describe.skip('numberParser', () => {
  it('Parses "1234567890"', async () => {
    // GIVEN:
    // The "1234567890" input
    const input = '1234567890';

    // WHEN:
    // Parsing the input with the numberParser
    const { result, remaining } = await numberParser(input);

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
    // Parsing the input with the numberParser
    const { result, remaining } = await numberParser(input);

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
      // Parsing the input with the numberParser
      await numberParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "9"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the other string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The "foo" string input
      const input = 'foo';
  
      // WHEN:
      // Parsing the input with the numberParser
      await numberParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "f...". Expecting "9"');
      } else {
        throw e;
      }
    }
  });
});

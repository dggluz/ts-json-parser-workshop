import { charParser } from '../src';

describe('charParser', () => {
  it('Parses "f"', async () => {
    // GIVEN:
    // The "f" input
    const input = 'f';

    // WHEN:
    // Parsing the input with the charParser
    const { result, remaining } = await charParser(input);

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
    // Parsing the input with the charParser
    const { result, remaining } = await charParser(input);

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
      // Parsing the input with the charParser
      await charParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting character.');
      } else {
        throw e;
      }
    }
  });
});

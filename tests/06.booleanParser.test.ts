import { booleanParser } from '../src';

describe('booleanParser', () => {
  it('Parses "true"', async () => {
    // GIVEN:
    // The "true" input
    const input = 'true';

    // WHEN:
    // Parsing the input with the booleanParser
    const { result, remaining } = await booleanParser(input);

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
    // Parsing the input with the booleanParser
    const { result, remaining } = await booleanParser(input);

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
    // Parsing the input with the booleanParser
    const { result, remaining } = await booleanParser(input);

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
    // Parsing the input with the booleanParser
    const { result, remaining } = await booleanParser(input);

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
      // Parsing the input with the booleanParser
      await booleanParser(input);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});

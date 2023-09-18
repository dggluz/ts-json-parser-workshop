import { jsonParser } from '../src';

describe('jsonParser (null & boolean)', () => {
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
});

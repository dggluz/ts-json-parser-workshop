import { digitParser } from '../src';

describe('digitParser', () => {
  it('Parses "0"', async () => {
    // GIVEN:
    // The "0" input
    const input = '0';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "0" string
    expect(result).toBe('0');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "0" with extra text', async () => {
    // GIVEN:
    // The "0" input, with extra text ("ABC")
    const input = '0ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "0" string
    expect(result).toBe('0');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "1"', async () => {
    // GIVEN:
    // The "1" input
    const input = '1';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "1" string
    expect(result).toBe('1');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "1" with extra text', async () => {
    // GIVEN:
    // The "1" input, with extra text ("ABC")
    const input = '1ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "1" string
    expect(result).toBe('1');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "2"', async () => {
    // GIVEN:
    // The "2" input
    const input = '2';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "2" string
    expect(result).toBe('2');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "2" with extra text', async () => {
    // GIVEN:
    // The "2" input, with extra text ("ABC")
    const input = '2ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "2" string
    expect(result).toBe('2');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "3"', async () => {
    // GIVEN:
    // The "3" input
    const input = '3';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "3" string
    expect(result).toBe('3');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "3" with extra text', async () => {
    // GIVEN:
    // The "3" input, with extra text ("ABC")
    const input = '3ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "3" string
    expect(result).toBe('3');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "4"', async () => {
    // GIVEN:
    // The "4" input
    const input = '4';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "4" string
    expect(result).toBe('4');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "4" with extra text', async () => {
    // GIVEN:
    // The "4" input, with extra text ("ABC")
    const input = '4ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "4" string
    expect(result).toBe('4');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "5"', async () => {
    // GIVEN:
    // The "5" input
    const input = '5';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "5" string
    expect(result).toBe('5');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "5" with extra text', async () => {
    // GIVEN:
    // The "5" input, with extra text ("ABC")
    const input = '5ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "5" string
    expect(result).toBe('5');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "6"', async () => {
    // GIVEN:
    // The "6" input
    const input = '6';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "6" string
    expect(result).toBe('6');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "6" with extra text', async () => {
    // GIVEN:
    // The "6" input, with extra text ("ABC")
    const input = '6ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "6" string
    expect(result).toBe('6');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "7"', async () => {
    // GIVEN:
    // The "7" input
    const input = '7';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "7" string
    expect(result).toBe('7');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "7" with extra text', async () => {
    // GIVEN:
    // The "7" input, with extra text ("ABC")
    const input = '7ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "7" string
    expect(result).toBe('7');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "8"', async () => {
    // GIVEN:
    // The "8" input
    const input = '8';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "8" string
    expect(result).toBe('8');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "8" with extra text', async () => {
    // GIVEN:
    // The "8" input, with extra text ("ABC")
    const input = '8ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "8" string
    expect(result).toBe('8');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "9"', async () => {
    // GIVEN:
    // The "9" input
    const input = '9';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "9" string
    expect(result).toBe('9');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "9" with extra text', async () => {
    // GIVEN:
    // The "9" input, with extra text ("ABC")
    const input = '9ABC';

    // WHEN:
    // Parsing the input with the digitParser
    const { result, remaining } = await digitParser(input);

    // THEN:
    // The result is the "9" string
    expect(result).toBe('9');
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
      // Parsing the input with the digitParser
      await digitParser(input);
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
      // Parsing the input with the digitParser
      await digitParser(input);
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

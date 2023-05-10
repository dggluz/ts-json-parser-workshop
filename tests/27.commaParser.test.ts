import { commaParser } from '../src';

describe.skip('Comma parser', () => {
  it('Parses ","', async () => {
    // GIVEN:
    // The "," input
    const input = ',';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," string
    expect(result).toBe(',');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "," with previous spaces', async () => {
    // GIVEN:
    // The "," input, with previous spaces
    const input = '   ,';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," string with previous spaces
    expect(result).toBe('   ,');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "," with following spaces', async () => {
    // GIVEN:
    // The "," input, with following spaces
    const input = ',   ';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," string with following spaces
    expect(result).toBe(',   ');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "," with previous and following spaces', async () => {
    // GIVEN:
    // The "," input, with previous and following spaces
    const input = '   ,   ';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," string with previous spaces
    expect(result).toBe('   ,   ');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "," with extra text', async () => {
    // GIVEN:
    // The "," input, with extra text ("ABC")
    const input = ',ABC';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," string
    expect(result).toBe(',');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "," with previous spaces and extra text', async () => {
    // GIVEN:
    // The "," input, with previous spaces and extra text ("ABC")
    const input = '   ,ABC';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," with previous spaces string
    expect(result).toBe('   ,');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "," with following spaces and extra text', async () => {
    // GIVEN:
    // The "," input, with following spaces and extra text ("ABC")
    const input = ',   ABC';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," with following spaces string
    expect(result).toBe(',   ');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "," with previous and following spaces and extra text', async () => {
    // GIVEN:
    // The "," input, with previous and following spaces and extra text ("ABC")
    const input = '   ,   ABC';

    // WHEN:
    // Parsing the input with the commaParser
    const { result, remaining } = await commaParser(input);

    // THEN:
    // The result is the "," with following spaces string
    expect(result).toBe('   ,   ');
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
      // Parsing the input with the commaParser
      await commaParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting ","');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the "foo" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The "foo" string input
      const input = 'foo';
  
      // WHEN:
      // Parsing the input with the commaParser
      await commaParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "f...". Expecting ","');
      } else {
        throw e;
      }
    }
  });
});

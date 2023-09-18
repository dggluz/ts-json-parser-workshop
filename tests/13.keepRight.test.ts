import { fromStr, keepRight } from '../src';

describe('keepRight', () => {
  it('"keepBar" parses "foobar"', async () => {
    // GIVEN:
    // A "keepBar" parser
    const keepBarParser = keepRight(fromStr('foo'), fromStr('bar'));
    // ...and the "foobar" input
    const input = 'foobar';

    // WHEN:
    // Parsing the input with the keepBarParser
    const { result, remaining } = await keepBarParser(input);

    // THEN:
    // The result is the "bar" string
    expect(result).toBe('bar');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foobar" with extra text', async () => {
    // GIVEN:
    // A "keepBar" parser
    const keepBarParser = keepRight(fromStr('foo'), fromStr('bar'));
    // ...and the "foobar" input, with extra text ("ABC")
    const input = 'foobarABC';

    // WHEN:
    // Parsing the input with the keepBarParser
    const { result, remaining } = await keepBarParser(input);

    // THEN:
    // The result is the "bar" string
    expect(result).toBe('bar');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Fails if an empty string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "keepBar" parser
      const keepBarParser = keepRight(fromStr('foo'), fromStr('bar'));
      // ...and the empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the keepBarParser
      await keepBarParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "foo"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the "baz" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "keepBar" parser
      const keepBarParser = keepRight(fromStr('foo'), fromStr('bar'));
      // ...and the "baz" string input
      const input = 'baz';
  
      // WHEN:
      // Parsing the input with the keepBarParser
      await keepBarParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "baz". Expecting "foo"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if a long string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "keepBar" parser
      const keepBarParser = keepRight(fromStr('foo'), fromStr('bar'));
      // ...and a long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the keepBarParser
      await keepBarParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "loo...". Expecting "foo"');
      } else {
        throw e;
      }
    }
  });
});
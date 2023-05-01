import { alt, fromStr } from '../src';

describe.skip('"alt" parser', () => {
  it('"fooOrBarParser" parses "foo"', async () => {
    // GIVEN:
    // A "fooOrBar" parser,
    const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
    // ...and the "foo" input
    const input = 'foo';

    // WHEN:
    // Parsing the input with the fooOrBarParser
    const { result, remaining } = await fooOrBarParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('"fooOrBarParser" parses "bar"', async () => {
    // GIVEN:
    // A "fooOrBar" parser,
    const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
    // ...and the "bar" input
    const input = 'bar';

    // WHEN:
    // Parsing the input with the fooOrBarParser
    const { result, remaining } = await fooOrBarParser(input);

    // THEN:
    // The result is the "bar" string
    expect(result).toBe('bar');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foo" with extra text', async () => {
    // GIVEN:
    // A "fooOrBar" parser,
    const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
    // ...and the "foo" input, with extra text ("ABC")
    const input = 'fooABC';

    // WHEN:
    // Parsing the input with the fooOrBarParser
    const { result, remaining } = await fooOrBarParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "bar" with extra text', async () => {
    // GIVEN:
    // A "fooOrBar" parser,
    const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
    // ...and the "bar" input, with extra text ("ABC")
    const input = 'barABC';

    // WHEN:
    // Parsing the input with the fooOrBarParser
    const { result, remaining } = await fooOrBarParser(input);

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
      // A "fooOrBar" parser,
      const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
      // ...and the empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the fooOrBarParser
      await fooOrBarParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "bar"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the "baz" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooOrBar" parser,
      const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
      // ...and the "baz" string input
      const input = 'baz';
  
      // WHEN:
      // Parsing the input with the fooOrBarParser
      await fooOrBarParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "baz". Expecting "bar"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if a long string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooOrBar" parser,
      const fooOrBarParser = alt(fromStr('foo'), fromStr('bar'));
      // ...and a long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the fooOrBarParser
      await fooOrBarParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "loo...". Expecting "bar"');
      } else {
        throw e;
      }
    }
  });
});

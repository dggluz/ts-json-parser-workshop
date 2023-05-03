import { altAll, fromStr } from '../src';

describe.skip('"altAll" parser', () => {
  it('"fooOrBarOrBazParser" parses "foo"', async () => {
    // GIVEN:
    // A "fooOrBarOrBaz" parser,
    const fooOrBarOrBazParser = altAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz')
    );
    // ...and the "foo" input
    const input = 'foo';

    // WHEN:
    // Parsing the input with the fooOrBarOrBazParser
    const { result, remaining } = await fooOrBarOrBazParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('"fooOrBarOrBazParser" parses "bar"', async () => {
    // GIVEN:
    // A "fooOrBarOrBaz" parser,
    const fooOrBarOrBazParser = altAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz'),
    );
    // ...and the "bar" input
    const input = 'bar';

    // WHEN:
    // Parsing the input with the fooOrBarOrBazParser
    const { result, remaining } = await fooOrBarOrBazParser(input);

    // THEN:
    // The result is the "bar" string
    expect(result).toBe('bar');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('"fooOrBarOrBazParser" parses "baz"', async () => {
    // GIVEN:
    // A "fooOrBarOrBaz" parser,
    const fooOrBarOrBazParser = altAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz'),
    );
    // ...and the "baz" input
    const input = 'baz';

    // WHEN:
    // Parsing the input with the fooOrBarOrBazParser
    const { result, remaining } = await fooOrBarOrBazParser(input);

    // THEN:
    // The result is the "baz" string
    expect(result).toBe('baz');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foo" with extra text', async () => {
    // GIVEN:
    // A "fooOrBarOrBaz" parser,
    const fooOrBarOrBazParser = altAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz'),
    );
    // ...and the "foo" input, with extra text ("ABC")
    const input = 'fooABC';

    // WHEN:
    // Parsing the input with the fooOrBarOrBazParser
    const { result, remaining } = await fooOrBarOrBazParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "bar" with extra text', async () => {
    // GIVEN:
    // A "fooOrBarOrBaz" parser,
    const fooOrBarOrBazParser = altAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz'),
    );
    // ...and the "bar" input, with extra text ("ABC")
    const input = 'barABC';

    // WHEN:
    // Parsing the input with the fooOrBarOrBazParser
    const { result, remaining } = await fooOrBarOrBazParser(input);

    // THEN:
    // The result is the "bar" string
    expect(result).toBe('bar');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "bar" with extra text', async () => {
    // GIVEN:
    // A "fooOrBarOrBaz" parser,
    const fooOrBarOrBazParser = altAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz'),
    );
    // ...and the "baz" input, with extra text ("ABC")
    const input = 'bazABC';

    // WHEN:
    // Parsing the input with the fooOrBarOrBazParser
    const { result, remaining } = await fooOrBarOrBazParser(input);

    // THEN:
    // The result is the "baz" string
    expect(result).toBe('baz');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Fails if an empty string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooOrBarOrBaz" parser,
      const fooOrBarOrBazParser = altAll(
        fromStr('foo'),
        fromStr('bar'),
        fromStr('baz'),
      );
      // ...and the empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the fooOrBarOrBazParser
      await fooOrBarOrBazParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "baz"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the "baz" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooOrBarOrBaz" parser,
      const fooOrBarOrBazParser = altAll(
        fromStr('foo'),
        fromStr('bar'),
        fromStr('baz'),
      );
      // ...and the "bat" string input
      const input = 'bat';
  
      // WHEN:
      // Parsing the input with the fooOrBarOrBazParser
      await fooOrBarOrBazParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "bat". Expecting "baz"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if a long string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooOrBarOrBaz" parser,
      const fooOrBarOrBazParser = altAll(
        fromStr('foo'),
        fromStr('bar'),
        fromStr('baz'),
      );
      // ...and a long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the fooOrBarOrBazParser
      await fooOrBarOrBazParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "loo...". Expecting "baz"');
      } else {
        throw e;
      }
    }
  });
});

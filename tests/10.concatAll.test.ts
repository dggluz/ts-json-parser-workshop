import { concatAll, fromStr } from '../src';

describe.skip('"concatAll" parser', () => {
  it('"fooBarBazParser" parses "foobarbaz"', async () => {
    // GIVEN:
    // A "fooBarBaz" parser,
    const fooBarBazParser = concatAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz')
    );
    // ...and the "foobarbaz" input
    const input = 'foobarbaz';

    // WHEN:
    // Parsing the input with the fooBarBazParser
    const { result, remaining } = await fooBarBazParser(input);

    // THEN:
    // The result is the "foobarbaz" string
    expect(result).toBe('foobarbaz');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foobarbaz" with extra text', async () => {
    // GIVEN:
    // A "fooBarBaz" parser,
    const fooBarBazParser = concatAll(
      fromStr('foo'),
      fromStr('bar'),
      fromStr('baz'),
    );
    // ...and the "foobarbaz" input, with extra text ("ABC")
    const input = 'foobarbazABC';

    // WHEN:
    // Parsing the input with the fooBarBazParser
    const { result, remaining } = await fooBarBazParser(input);

    // THEN:
    // The result is the "foobarbaz" string
    expect(result).toBe('foobarbaz');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Fails if an empty string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooBarBaz" parser,
      const fooBarBazParser = concatAll(
        fromStr('foo'),
        fromStr('bar'),
        fromStr('baz'),
      );
      // ...and the empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the fooBarBazParser
      await fooBarBazParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected end of input. Expecting "foo"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if the "bar" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooBarBaz" parser,
      const fooBarBazParser = concatAll(
        fromStr('foo'),
        fromStr('bar'),
        fromStr('baz'),
      );
      // ...and the "bar" string input
      const input = 'bar';
  
      // WHEN:
      // Parsing the input with the fooBarBazParser
      await fooBarBazParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "bar". Expecting "foo"');
      } else {
        throw e;
      }
    }
  });

  it('Fails if a long string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "fooBarBaz" parser,
      const fooBarBazParser = concatAll(
        fromStr('foo'),
        fromStr('bar'),
        fromStr('baz'),
      );
      // ...and a long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the fooBarBazParser
      await fooBarBazParser(input);
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

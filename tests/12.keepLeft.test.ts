import { fromStr, keepLeft } from '../src';

describe.skip('keepLeft', () => {
  it('"keepFoo" parses "foobar"', async () => {
    // GIVEN:
    // A "keepFoo" parser
    const keepFooParser = keepLeft(fromStr('foo'), fromStr('bar'));
    // ...and the "foobar" input
    const input = 'foobar';

    // WHEN:
    // Parsing the input with the keepFooParser
    const { result, remaining } = await keepFooParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foobar" with extra text', async () => {
    // GIVEN:
    // A "keepFoo" parser
    const keepFooParser = keepLeft(fromStr('foo'), fromStr('bar'));
    // ...and the "foobar" input, with extra text ("ABC")
    const input = 'foobarABC';

    // WHEN:
    // Parsing the input with the keepFooParser
    const { result, remaining } = await keepFooParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Fails if an empty string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "keepFoo" parser
      const keepFooParser = keepLeft(fromStr('foo'), fromStr('bar'));
      // ...and the empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the keepFooParser
      await keepFooParser(input);
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
      // A "keepFoo" parser
      const keepFooParser = keepLeft(fromStr('foo'), fromStr('bar'));
      // ...and the "baz" string input
      const input = 'baz';
  
      // WHEN:
      // Parsing the input with the keepFooParser
      await keepFooParser(input);
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
      // A "keepFoo" parser
      const keepFooParser = keepLeft(fromStr('foo'), fromStr('bar'));
      // ...and a long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the keepFooParser
      await keepFooParser(input);
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
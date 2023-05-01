import { fooParser } from '../src';

describe('"foo" parser', () => {
  it('Parses "foo"', async () => {
    // GIVEN:
    // The "foo" input
    const input = 'foo';

    // WHEN:
    // Parsing the input with the fooParser
    const { result, remaining } = await fooParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foo" with extra text', async () => {
    // GIVEN:
    // The "foo" input, with extra text ("ABC")
    const input = 'fooABC';

    // WHEN:
    // Parsing the input with the fooParser
    const { result, remaining } = await fooParser(input);

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
      // The empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the fooParser
      await fooParser(input);
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
      // The "bar" string input
      const input = 'bar';
  
      // WHEN:
      // Parsing the input with the fooParser
      await fooParser(input);
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
      // A long string input
      const input = 'loooooong';
  
      // WHEN:
      // Parsing the input with the fooParser
      await fooParser(input);
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

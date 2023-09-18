import { objectParser } from '../src';

describe('objectParser', () => {
  it('Parses an empty object', async () => {
    // GIVEN:
    // A stringified empty object input
    const input = '{ }';

    // WHEN:
    // Parsing it with the objectParser
    const { result, remaining } = await objectParser(input);

    // THEN:
    // The result is an empty object
    expect(result).toEqual({});
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a complex object', async () => {
    // GIVEN:
    // A stringified complex object input
    const input = '{ "foo": [null, false, 123], "bar": { "baz": true } }';

    // WHEN:
    // Parsing it with the objectParser
    const { result, remaining } = await objectParser(input);

    // THEN:
    // The result is a complex object
    expect(result).toEqual({
      foo: [null, false, 123],
      bar: {
        baz: true,
      },
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses an empty object, with extra text', async () => {
    // GIVEN:
    // A stringified empty object input, with extra text ("ABC")
    const input = '{}ABC';

    // WHEN:
    // Parsing it with the objectParser
    const { result, remaining } = await objectParser(input);

    // THEN:
    // The result is a complex object
    expect(result).toEqual({});
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses a complex object, with extra text', async () => {
    // GIVEN:
    // A stringified complex object input, with extra text ("ABC")
    const input = '{ "foo": [null, false, 123], "bar": { "baz": true } }ABC';

    // WHEN:
    // Parsing it with the objectParser
    const { result, remaining } = await objectParser(input);

    // THEN:
    // The result is a complex object
    expect(result).toEqual({
      foo: [null, false, 123],
      bar: {
        baz: true,
      },
    });
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Fails if the "baz" string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // The "baz" string input
      const input = 'baz';
  
      // WHEN:
      // Parsing the input with the objectParser
      await objectParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "b...". Expecting "{"');
      } else {
        throw e;
      }
    }
  });
});

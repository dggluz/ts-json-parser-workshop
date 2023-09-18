import { keyValueParser } from '../src';

describe('keyValueParser', () => {
  it('Parses a keyValue pair ("foo" key, null value)', async () => {
    // GIVEN:
    // A keyValue pair ("foo" key, null value) string input
    const input = '"foo": null';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the null value
    expect(result).toEqual({
      key: 'foo',
      value: null,
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a keyValue pair ("bar" key, null value)', async () => {
    // GIVEN:
    // A keyValue pair ("bar" key, null value) string input
    const input = '"bar"  :  null';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the null value
    expect(result).toEqual({
      key: 'bar',
      value: null,
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a keyValue pair ("foo" key, boolean value)', async () => {
    // GIVEN:
    // A keyValue pair ("foo" key, boolean value) string input
    const input = '"foo": true';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the boolean value
    expect(result).toEqual({
      key: 'foo',
      value: true,
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a keyValue pair ("foo" key, string value)', async () => {
    // GIVEN:
    // A keyValue pair ("foo" key, string value) string input
    const input = '"foo": "bar"';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the string value
    expect(result).toEqual({
      key: 'foo',
      value: 'bar',
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a keyValue pair ("foo" key, numeric value)', async () => {
    // GIVEN:
    // A keyValue pair ("foo" key, numeric value) string input
    const input = '"foo": 42';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the numeric value
    expect(result).toEqual({
      key: 'foo',
      value: 42,
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a keyValue pair ("foo" key, array value)', async () => {
    // GIVEN:
    // A keyValue pair ("foo" key, array value) string input
    const input = '"foo": []';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the array value
    expect(result).toEqual({
      key: 'foo',
      value: [],
    });
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a keyValue pair ("foo" key, null value), with extra text', async () => {
    // GIVEN:
    // A keyValue pair ("foo" key, null value) string input, with extra text ("ABC")
    const input = '"foo": nullABC';

    // WHEN:
    // Calling the keyValueParser with the input
    const { result, remaining } = await keyValueParser(input);

    // THEN:
    // The result is a keyValue object, with the "foo" key and the null value
    expect(result).toEqual({
      key: 'foo',
      value: null,
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
      // Parsing the input with the keyValueParser
      await keyValueParser(input);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message)
          .toEqual('Unexpected "b...". Expecting """');
      } else {
        throw e;
      }
    }
  });
});

import { fromStr, oneOrMore } from '../src';

describe('oneOrMore', () => {
  it('Parses "foo"', async () => {
    // GIVEN:
    // A "oneOrMoreFoo" parser
    const oneOrMoreFoo = oneOrMore(fromStr('foo'));
    // ...and the "foo" input
    const input = 'foo';

    // WHEN:
    // Parsing the input with the oneOrMoreFoo
    const { result, remaining } = await oneOrMoreFoo(input);

    // THEN:
    // The result is the ["foo"] array
    expect(result).toEqual(['foo']);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses several "foo"', async () => {
    // GIVEN:
    // A "oneOrMoreFoo" parser
    const oneOrMoreFoo = oneOrMore(fromStr('foo'));
    // ...and an input with several "foo"s
    const input = 'foofoofoofoofoo';

    // WHEN:
    // Parsing the input with the oneOrMoreFoo
    const { result, remaining } = await oneOrMoreFoo(input);

    // THEN:
    // The result is the ['foo', 'foo', 'foo', 'foo', 'foo'] array
    expect(result).toEqual(['foo', 'foo', 'foo', 'foo', 'foo']);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foo" with extra text', async () => {
    // GIVEN:
    // A "oneOrMoreFoo" parser
    const oneOrMoreFoo = oneOrMore(fromStr('foo'));
    // ...and the "foo" with extra text input
    const input = 'fooABC';

    // WHEN:
    // Parsing the input with the oneOrMoreFoo
    const { result, remaining } = await oneOrMoreFoo(input);

    // THEN:
    // The result is the ["foo"] array
    expect(result).toEqual(['foo']);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses several "foo" with extra text', async () => {
    // GIVEN:
    // A "oneOrMoreFoo" parser
    const oneOrMoreFoo = oneOrMore(fromStr('foo'));
    // ...and an input with several "foo"s with extra text
    const input = 'foofoofoofoofooABC';

    // WHEN:
    // Parsing the input with the oneOrMoreFoo
    const { result, remaining } = await oneOrMoreFoo(input);

    // THEN:
    // The result is the ['foo', 'foo', 'foo', 'foo', 'foo'] array
    expect(result).toEqual(['foo', 'foo', 'foo', 'foo', 'foo']);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Fails if an empty string is supplied', async () => {
    expect.assertions(1);
    try {
      // GIVEN:
      // A "oneOrMoreFoo" parser
      const oneOrMoreFoo = oneOrMore(fromStr('foo'));
      // ...and the empty string input
      const input = '';
  
      // WHEN:
      // Parsing the input with the oneOrMoreFoo
      await oneOrMoreFoo(input);
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
      // A "oneOrMoreFoo" parser
      const oneOrMoreFoo = oneOrMore(fromStr('foo'));
      // ...and the "baz" string input
      const input = 'baz';
  
      // WHEN:
      // Parsing the input with the oneOrMoreFoo
      await oneOrMoreFoo(input);
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
      // A "oneOrMoreFoo" parser
      const oneOrMoreFoo = oneOrMore(fromStr('foo'));
      // ...and a long string input
      const input = 'loooooong';

      // WHEN:
      // Parsing the input with the oneOrMoreFoo
      await oneOrMoreFoo(input);
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

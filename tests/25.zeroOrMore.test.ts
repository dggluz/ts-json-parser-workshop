import { fromStr, zeroOrMore } from '../src';

describe.skip('zeroOrMore', () => {
  it('Parses the empty string', async () => {
    // GIVEN:
    // A "zeroOrMoreFoo" parser
    const zeroOrMoreFooParser = zeroOrMore(fromStr('foo'));
    // ...and the empty string input
    const input = '';

    // WHEN:
    // Parsing the input with the zeroOrMoreFooParser
    const { result, remaining } = await zeroOrMoreFooParser(input);

    // THEN:
    // The result is the empty array
    expect(result).toEqual([]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foo"', async () => {
    // GIVEN:
    // A "zeroOrMoreFoo" parser
    const zeroOrMoreFooParser = zeroOrMore(fromStr('foo'));
    // ...and the "foo" input
    const input = 'foo';

    // WHEN:
    // Parsing the input with the zeroOrMoreFooParser
    const { result, remaining } = await zeroOrMoreFooParser(input);

    // THEN:
    // The result is the ["foo"] array
    expect(result).toEqual(['foo']);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses several "foo"', async () => {
    // GIVEN:
    // A "zeroOrMoreFoo" parser
    const zeroOrMoreFooParser = zeroOrMore(fromStr('foo'));
    // ...and an input with several "foo"s
    const input = 'foofoofoofoofoo';

    // WHEN:
    // Parsing the input with the zeroOrMoreFooParser
    const { result, remaining } = await zeroOrMoreFooParser(input);

    // THEN:
    // The result is the ['foo', 'foo', 'foo', 'foo', 'foo'] array
    expect(result).toEqual(['foo', 'foo', 'foo', 'foo', 'foo']);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the empty string with extra text', async () => {
    // GIVEN:
    // A "zeroOrMoreFoo" parser
    const zeroOrMoreFooParser = zeroOrMore(fromStr('foo'));
    // ...and the "empty string with extra text input
    const input = 'ABC';

    // WHEN:
    // Parsing the input with the zeroOrMoreFooParser
    const { result, remaining } = await zeroOrMoreFooParser(input);

    // THEN:
    // The result is the empty array
    expect(result).toEqual([]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "foo" with extra text', async () => {
    // GIVEN:
    // A "zeroOrMoreFoo" parser
    const zeroOrMoreFooParser = zeroOrMore(fromStr('foo'));
    // ...and the "foo" with extra text input
    const input = 'fooABC';

    // WHEN:
    // Parsing the input with the zeroOrMoreFooParser
    const { result, remaining } = await zeroOrMoreFooParser(input);

    // THEN:
    // The result is the ["foo"] array
    expect(result).toEqual(['foo']);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses several "foo" with extra text', async () => {
    // GIVEN:
    // A "zeroOrMoreFoo" parser
    const zeroOrMoreFooParser = zeroOrMore(fromStr('foo'));
    // ...and an input with several "foo"s with extra text
    const input = 'foofoofoofoofooABC';

    // WHEN:
    // Parsing the input with the zeroOrMoreFooParser
    const { result, remaining } = await zeroOrMoreFooParser(input);

    // THEN:
    // The result is the ['foo', 'foo', 'foo', 'foo', 'foo'] array
    expect(result).toEqual(['foo', 'foo', 'foo', 'foo', 'foo']);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });
});

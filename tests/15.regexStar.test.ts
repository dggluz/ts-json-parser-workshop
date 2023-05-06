import { fromStr, regexStar } from '../src';

describe.skip('regexStar', () => {
  it('Parses the empty string', async () => {
    // GIVEN:
    // A "fooStar" parser
    const fooStarParser = regexStar(fromStr('foo'));
    // ...and the empty string input
    const input = '';

    // WHEN:
    // Parsing the input with the fooStarParser
    const { result, remaining } = await fooStarParser(input);

    // THEN:
    // The result is the empty string
    expect(result).toBe('');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses "foo"', async () => {
    // GIVEN:
    // A "fooStar" parser
    const fooStarParser = regexStar(fromStr('foo'));
    // ...and the "foo" input
    const input = 'foo';

    // WHEN:
    // Parsing the input with the fooStarParser
    const { result, remaining } = await fooStarParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses several "foo"', async () => {
    // GIVEN:
    // A "fooStar" parser
    const fooStarParser = regexStar(fromStr('foo'));
    // ...and an input with several "foo"s
    const input = 'foofoofoofoofoo';

    // WHEN:
    // Parsing the input with the fooStarParser
    const { result, remaining } = await fooStarParser(input);

    // THEN:
    // The result is the "foofoofoofoofoo" string
    expect(result).toBe('foofoofoofoofoo');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the empty string with extra text', async () => {
    // GIVEN:
    // A "fooStar" parser
    const fooStarParser = regexStar(fromStr('foo'));
    // ...and the "empty string with extra text input
    const input = 'ABC';

    // WHEN:
    // Parsing the input with the fooStarParser
    const { result, remaining } = await fooStarParser(input);

    // THEN:
    // The result is the empty string
    expect(result).toBe('');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses "foo" with extra text', async () => {
    // GIVEN:
    // A "fooStar" parser
    const fooStarParser = regexStar(fromStr('foo'));
    // ...and the "foo" with extra text input
    const input = 'fooABC';

    // WHEN:
    // Parsing the input with the fooStarParser
    const { result, remaining } = await fooStarParser(input);

    // THEN:
    // The result is the "foo" string
    expect(result).toBe('foo');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses several "foo" with extra text', async () => {
    // GIVEN:
    // A "fooStar" parser
    const fooStarParser = regexStar(fromStr('foo'));
    // ...and an input with several "foo"s with extra text
    const input = 'foofoofoofoofooABC';

    // WHEN:
    // Parsing the input with the fooStarParser
    const { result, remaining } = await fooStarParser(input);

    // THEN:
    // The result is the "foofoofoofoofoo" string
    expect(result).toBe('foofoofoofoofoo');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });
});

import { prepend, pure } from '../src';

describe('prepend', () => {
  it('Prepends an element to a string list', async () => {
    // GIVEN:
    // A Parser<string> value,
    const element = pure('foo');
    // ...a Parser<string[]> value,
    const list = pure(['bar', 'baz']);
    // ...a parser that prepends the value to the list
    const parser = prepend(element, list);
    // ...and an input
    const input = 'some input';

    // WHEN:
    // Calling the parser
    const { result, remaining } = await parser(input);
    
    // THEN:
    // The result is the array with the prepended element
    expect(result).toEqual(['foo', 'bar', 'baz']);
    // ...and the remaining is the whole input
    expect(remaining).toBe(input);
  });

  it('Prepends an element to a number list', async () => {
    // GIVEN:
    // A Parser<number> value,
    const element = pure(1);
    // ...a Parser<number[]> value,
    const list = pure([2, 3]);
    // ...a parser that prepends the value to the list
    const parser = prepend(element, list);
    // ...and an input
    const input = 'some input';

    // WHEN:
    // Calling the parser
    const { result, remaining } = await parser(input);
    
    // THEN:
    // The result is the array with the prepended element
    expect(result).toEqual([1, 2, 3]);
    // ...and the remaining is the whole input
    expect(remaining).toBe(input);
  });
});

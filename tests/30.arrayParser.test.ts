import { arrayParser } from '../src';

describe('Array parser', () => {
  it('Parses the empty array', async () => {
    // GIVEN:
    // The stringified empty array input
    const input = '[]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the empty array
    expect(result).toEqual([]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the nulls array', async () => {
    // GIVEN:
    // The stringified array of nulls input
    const input = '[ null, null, null ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of nulls
    expect(result).toEqual([ null, null, null ]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the nulls array', async () => {
    // GIVEN:
    // The stringified array of nulls input
    const input = '[ null, null, null ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of nulls
    expect(result).toEqual([ null, null, null ]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the booleans array', async () => {
    // GIVEN:
    // The stringified array of booleans input
    const input = '[ false, true ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of booleans
    expect(result).toEqual([ false, true ]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the strings array', async () => {
    // GIVEN:
    // The stringified array of strings input
    const input = '[ "foo", "bar", "baz" ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of strings
    expect(result).toEqual([ 'foo', 'bar', 'baz' ]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the numbers array', async () => {
    // GIVEN:
    // The stringified array of numbers input
    const input = '[ 1, 2, 3 ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of numbers
    expect(result).toEqual([ 1, 2, 3 ]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the arrays of arrays', async () => {
    // GIVEN:
    // The stringified array of arrays input
    const input = '[ [], [] ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of arrays
    expect(result).toEqual([ [], [] ]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses mixed arrays', async () => {
    // GIVEN:
    // The stringified array of mixed values input
    const input = '[ null, true, "foo", 1, [false, "bar", 2] ]';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of mixed values
    expect(result).toEqual([ null, true, 'foo', 1, [false, 'bar', 2]]);
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the empty array, with extra text', async () => {
    // GIVEN:
    // The stringified empty array input, with extra text ("ABC")
    const input = '[]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the empty array
    expect(result).toEqual([]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the nulls array, with extra text', async () => {
    // GIVEN:
    // The stringified array of nulls input, with extra text ("ABC")
    const input = '[ null, null, null ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of nulls
    expect(result).toEqual([ null, null, null ]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the nulls array, with extra text', async () => {
    // GIVEN:
    // The stringified array of nulls input, with extra text ("ABC")
    const input = '[ null, null, null ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of nulls
    expect(result).toEqual([ null, null, null ]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the booleans array, with extra text', async () => {
    // GIVEN:
    // The stringified array of booleans input, with extra text ("ABC")
    const input = '[ false, true ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of booleans
    expect(result).toEqual([ false, true ]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the strings array, with extra text', async () => {
    // GIVEN:
    // The stringified array of strings input, with extra text ("ABC")
    const input = '[ "foo", "bar", "baz" ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of strings
    expect(result).toEqual([ 'foo', 'bar', 'baz' ]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the numbers array, with extra text', async () => {
    // GIVEN:
    // The stringified array of numbers input, with extra text ("ABC")
    const input = '[ 1, 2, 3 ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of numbers
    expect(result).toEqual([ 1, 2, 3 ]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the arrays of arrays, with extra text', async () => {
    // GIVEN:
    // The stringified array of arrays input, with extra text ("ABC")
    const input = '[ [], [] ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of arrays
    expect(result).toEqual([ [], [] ]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses mixed arrays, with extra text', async () => {
    // GIVEN:
    // The stringified array of mixed values input, with extra text ("ABC")
    const input = '[ null, true, "foo", 1, [false, "bar", 2] ]ABC';

    // WHEN:
    // Calling the arrayParser with the input
    const { result, remaining } = await arrayParser(input);

    // THEN:
    // The result is the array of mixed values
    expect(result).toEqual([ null, true, 'foo', 1, [false, 'bar', 2]]);
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });
});

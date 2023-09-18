import { spaceParser } from '../src';

describe('Space parser', () => {
  it('Parses the empty string', async () => {
    // GIVEN:
    // The empty string input
    const input = '';

    // WHEN:
    // Parsing the input with the spaceParser
    const { result, remaining } = await spaceParser(input);

    // THEN:
    // The result is the empty string
    expect(result).toBe('');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses a single space string', async () => {
    // GIVEN:
    // A simple space string input
    const input = ' ';

    // WHEN:
    // Parsing the input with the spaceParser
    const { result, remaining } = await spaceParser(input);

    // THEN:
    // The result is the single space string
    expect(result).toBe(' ');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses multiple spaces', async () => {
    // GIVEN:
    // A multiple spaces string input
    const input = '     ';

    // WHEN:
    // Parsing the input with the spaceParser
    const { result, remaining } = await spaceParser(input);

    // THEN:
    // The result is the multiple spaces string
    expect(result).toBe('     ');
    // ...and the remaining is the empty string
    expect(remaining).toBe('');
  });

  it('Parses the empty string with extra text', async () => {
    // GIVEN:
    // The empty string input, with extra text ("ABC")
    const input = 'ABC';

    // WHEN:
    // Parsing the input with the spaceParser
    const { result, remaining } = await spaceParser(input);

    // THEN:
    // The result is the empty string
    expect(result).toBe('');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the single space string with extra text', async () => {
    // GIVEN:
    // The single space string input, with extra text ("ABC")
    const input = ' ABC';

    // WHEN:
    // Parsing the input with the spaceParser
    const { result, remaining } = await spaceParser(input);

    // THEN:
    // The result is the single space string
    expect(result).toBe(' ');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });

  it('Parses the multiple spaces string with extra text', async () => {
    // GIVEN:
    // The multiple spaces string input, with extra text ("ABC")
    const input = '     ABC';

    // WHEN:
    // Parsing the input with the spaceParser
    const { result, remaining } = await spaceParser(input);

    // THEN:
    // The result is the multiple spaces string
    expect(result).toBe('     ');
    // ...and the remaining is the "ABC" string
    expect(remaining).toBe('ABC');
  });
});

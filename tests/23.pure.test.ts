import { pure } from '../src';

describe ('pure', () => {
  it('Resolves to expected string, without consuming input', async () => {
    // GIVEN:
    // A string expected value,
    const expectedValue = 'foo';
    // ...a parser created from that value,
    const parser = pure(expectedValue);
    // ...and an input
    const input = 'bar';

    // WHEN:
    // Calling the parser with the input
     const { result, remaining } = await parser(input);

     // THEN:
     // The result is the expected value
     expect(result).toBe(expectedValue);
     // ...and the remaining is the whole input
     expect(remaining).toBe(input);
  });

  it('Resolves to expected number, without consuming input', async () => {
    // GIVEN:
    // A number expected value,
    const expectedValue = 42;
    // ...a parser created from that value,
    const parser = pure(expectedValue);
    // ...and an input
    const input = 'bar';

    // WHEN:
    // Calling the parser with the input
     const { result, remaining } = await parser(input);

     // THEN:
     // The result is the expected value
     expect(result).toBe(expectedValue);
     // ...and the remaining is the whole input
     expect(remaining).toBe(input);
  });

  it('Resolves to expected boolean, without consuming input', async () => {
    // GIVEN:
    // A boolean expected value,
    const expectedValue = true;
    // ...a parser created from that value,
    const parser = pure(expectedValue);
    // ...and an input
    const input = 'bar';

    // WHEN:
    // Calling the parser with the input
     const { result, remaining } = await parser(input);

     // THEN:
     // The result is the expected value
     expect(result).toBe(expectedValue);
     // ...and the remaining is the whole input
     expect(remaining).toBe(input);
  });

  it('Resolves to expected array, without consuming input', async () => {
    // GIVEN:
    // A array expected value,
    const expectedValue = [1, 2, 3];
    // ...a parser created from that value,
    const parser = pure(expectedValue);
    // ...and an input
    const input = 'bar';

    // WHEN:
    // Calling the parser with the input
     const { result, remaining } = await parser(input);

     // THEN:
     // The result is the expected value
     expect(result).toBe(expectedValue);
     // ...and the remaining is the whole input
     expect(remaining).toBe(input);
  });

  it('Resolves to expected object, without consuming input', async () => {
    // GIVEN:
    // A object expected value,
    const expectedValue = {
      name: 'John',
      age: 42,
    };

    // ...a parser created from that value,
    const parser = pure(expectedValue);
    // ...and an input
    const input = 'bar';

    // WHEN:
    // Calling the parser with the input
     const { result, remaining } = await parser(input);

     // THEN:
     // The result is the expected value
     expect(result).toBe(expectedValue);
     // ...and the remaining is the whole input
     expect(remaining).toBe(input);
  });
});

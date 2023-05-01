type Parser <T> = (input: string) => Promise<{
  result: T;
  remaining: string;
}>;

export const fooParser: Parser<'foo'> = input => {
  const expected = 'foo';

  if (input.startsWith(expected)) {
    return Promise.resolve({
      result: expected,
      remaining: input.slice(expected.length),
    });
  }

  if (!input.length) {
    return Promise.reject(new Error(`Unexpected end of input. Expecting "${
      expected
    }"`));
  }

  if (input.length <= expected.length) {
    return Promise.reject(
      new Error(`Unexpected "${input}". Expecting "${expected}"`)
    );
  }

  return Promise.reject(
    new Error(`Unexpected "${
      input.slice(0, expected.length)
    }...". Expecting "${expected}"`)
  );
};

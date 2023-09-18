import { Parser } from '.';

export type GetParserType <T> = T extends Parser<infer U> ? U : never;

type Join<A, R extends string = ''> = A extends [infer First, ...infer Rest] ?
  Join<Rest, R extends ''
    ? `${First & string}`
    : `${R}${First & string}`>
  : R;

// ¡Y esta! Ignorarla con fuerza:
export type ConcatAll <P extends Parser<string>[]> = Join<{
  [K in keyof P]: GetParserType<P[K]>
}>;

export const dummy = null;

import { describe, it, expect } from "vitest";
import pipe from "./pipe";

const add = (num1: number, num2: number) => num1 + num2;

describe("pipe", () => {
  it("can pass a wrapped value into a piped function", () => {
    expect(pipe(() => 2).pipe(add, 2).result).toEqual(4);
  });

  it("can pipe a value multiple times", () => {
    expect(
      pipe(() => 2)
        .pipe(add, 1)
        .pipe(add, 2).result
    ).toEqual(5);
  });

  it("can be used with different data types", () => {
    expect(
      pipe(() => "2")
        .pipe(parseInt)
        .pipe(add, 2).result
    ).toEqual(4);
  });

  it("can convert data types multiple times across pipes", () => {
    expect(
      pipe(() => "4")
        .pipe(parseInt)
        .pipe(add, 2)
        .pipe((num: number) => num.toString()).result
    ).toEqual("6");
  });

  it("handles thrown errors", () => {
    const { error } = pipe(() => {
      throw new Error("Boom!");
    });

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toEqual("Boom!");
  });

  it("can be used with destructuring", () => {
    const { ok, error, state, result } = pipe(() => 2);
    // type tests
    if (state === "ok") {
      const _ok: true = ok;
      const _result: number = result;
      const _error: undefined = error;
    } else {
      const _state: "error" = state;
      const _ok: false = ok;
      const _result: undefined = result;
      const _error: unknown = error;
    }
  });
});

// Type tests
() => {
  // Should require an int, given the first pipe
  //@ts-expect-error
  pipe(() => 2).pipe((foo: string) => {
    console.log(foo);
    return foo;
  });

  // Should require a string, given the first pipe
  //@ts-expect-error
  pipe(() => "2").pipe((foo: number) => {
    console.log(foo);
    return foo;
  });

  pipe(() => "2")
    .pipe(parseInt)
    // Should require an int, given the prior pipe
    //@ts-expect-error
    .pipe((foo: string) => console.log(foo));
};

import { describe, it, expect } from "vitest";
import pipe from "./index";

const add = (num1: number, num2: number) => num1 + num2;

describe("pipe", () => {
  it("can pass a wrapped value into a piped function", () => {
    expect(pipe(() => 2).pipe(add, 2).ok).toEqual(4);
  });

  it("can pipe a value multiple times", () => {
    expect(
      pipe(() => 2)
        .pipe(add, 1)
        .pipe(add, 2).ok
    ).toEqual(5);
  });

  it("can be used with different data types", () => {
    expect(
      pipe(() => "2")
        .pipe(parseInt)
        .pipe(add, 2).ok
    ).toEqual(4);
  });

  it("handles thrown errors", () => {
    const result = pipe(() => {
      throw new Error("Boom!");
    });

    if (!result.ok) {
      expect(result.error).toBeInstanceOf("Error");
      expect(result.error.message).toEqual("Boom!");
    }
  });
});

// Type tests

// it doesn't allow you to chain a fn expecting a string off of
// a function that returns an int
//@ts-expect-error
pipe(() => 2).pipe((foo: string) => console.log(foo));

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

type Result<T> = {
  state: "ok";
  ok: true;
  result: T;
  error: undefined;
  pipe: <
    Fn extends (() => any) | ((...args: [T, ...any]) => any),
    Params extends Parameters<Fn>
  >(
    pipeFn: Fn,
    ...args: DropFirst<Params>
  ) => Result<ReturnType<Fn>> | ResultError;
};

type ResultError = {
  state: "error";
  ok: false;
  result: undefined;
  error: unknown;
  pipe: () => ResultError;
};

export default function pipe<T>(fn: () => T): Result<T> | ResultError {
  const nextFn = () => fn();

  function wrap<
    Fn extends (() => any) | ((...args: [T, ...any]) => any),
    Params extends Parameters<Fn>
  >(pipeFn: Fn, ...args: DropFirst<Params>) {
    return pipe(() => pipeFn(nextFn(), ...args));
  }

  try {
    const nextVal = nextFn();

    return {
      state: "ok",
      ok: true,
      error: undefined,
      result: nextVal,
      pipe: wrap,
    };
  } catch (err) {
    return {
      state: "error",
      ok: false,
      error: err,
      result: undefined,
      // If any function in the chain throws, bypass any future
      // calls to pipe by re-throwing the error
      pipe: () => {
        throw err;
      },
    };
  }
}

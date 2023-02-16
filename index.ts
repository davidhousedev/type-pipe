type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export default function foo<T>(fn: () => T):
  | {
      ok: T;
      error: undefined;
      pipe: <
        Fn extends (() => any) | ((...args: [T, ...any]) => any),
        Params extends Parameters<Fn>
      >(
        pipeFn: Fn,
        ...args: DropFirst<Params>
      ) => ReturnType<Fn>;
    }
  | { ok: undefined; error: unknown; pipe: () => void } {
  const nextFn = () => fn();

  function wrap<
    Fn extends (() => any) | ((...args: [T, ...any]) => any),
    Params extends Parameters<Fn>
  >(pipeFn: Fn, ...args: DropFirst<Params>) {
    return foo(() => pipeFn(nextFn(), ...args));
  }

  try {
    const nextVal = nextFn();

    return {
      pipe: wrap,
      ok: nextVal,
      error: null,
    };
  } catch (err) {
    return {
      ok: undefined,
      error: err,
      // If any function in the chain throws, bypass any future
      // calls to pipe by re-throwing the error
      pipe: () => {
        throw err;
      },
    };
  }
}

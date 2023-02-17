# TYPE PIPE 

type-pipe contains a type-safe `pipe()` function implementation, because you just can't wait for JS-native pipes.

```ts
// begin with a value
const result = pipe(() => "2")
  // it is passed as the first argument to the next piped function
  .pipe(parseInt)
  // you may pass additional arguments, beyond the first piped argument
  .pipe(add, 2)
  // your functions must expect the same type as the prior function
  .pipe((num: number) => num.toString())
  // as your value changes, so does the required type of your piped functions
  .pipe((num: string) => num.repeat(3))

const add = (num1: number, num2: number) => num1 + num2
```

## Supports

* ⛓ Chaining functions via `pipe().pipe()` etc.
* 🏭 Passing the return of one `pipe` to the first argument of the next `pipe`
* 👾 Catching errors and returning them safely
* 🦺 Type safety between pipes

### Not yet supported

* Async functions

## Contributing

Contributions welcome! Feel free to fork the repo and open PRs.

Contributions will not be accepted without unit tests ❤️.

1. Fork the repo
2. Complete your change
3. Create a changeset with `pnpm run changeset` describing your change
4. Open a PR to this repo at `main`

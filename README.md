# TYPE PIPE

type-pipe contains a type-safe `pipe()` function implementation, because you just can't wait for JS-native pipes.

## Supports

* Chaining functions via `pipe().pipe()` etc.
* Passing the return of one `pipe` to the first argument of the next `pipe`
* Catching errors and returning them safely
* Type safety 

## Contributing

1. Create a changeset with `pnpm run changeset` describing your change
2. Open a PR to `main`

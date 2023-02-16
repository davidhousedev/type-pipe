# TYPE PIPE 

type-pipe contains a type-safe `pipe()` function implementation, because you just can't wait for JS-native pipes.

## Supports

* ⛓ Chaining functions via `pipe().pipe()` etc.
* 🏭 Passing the return of one `pipe` to the first argument of the next `pipe`
* 👾 Catching errors and returning them safely
* 🦺 Type safety between pipes

### Not yet supported

* Async functions

## Contributing

Contributions welcome! Feel free to fork the repo and open PRs.

1. Fork the repo
2. Complete your change
3. Create a changeset with `pnpm run changeset` describing your change
4. Open a PR to this repo at `main`

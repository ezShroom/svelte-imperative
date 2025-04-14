# svelte-imperative - a stateful wrapper for svelte 5 imperative components

**tl;dr**: Svelte 5 killed `$set` but didn’t replace it. This package wraps the new `mount()` API to give you prop updates without fighting proxies in .svelte.js files.

**👉 Use this if:**

- You’re stuck with imperative components (browser extensions, partial rendering, legacy code, etc). **SvelteKit is a better solution in most cases, and does this for you.**
- You miss Svelte 4’s `$set`, or just generally think that kind of interface is better for you
- You’ve tried `$state` for reactivity with imperative components in `.svelte.js` and now hate proxies

## Installation

```bash
bun i svelte-imperative # (or any other package manager)
```

You'll also need to have Svelte 5 or newer installed. For Svelte 4 and below, use the [`$set` function](https://svelte.dev/docs/svelte/legacy-component-api#$set) with the official imperative component API instead.

## Why?

Svelte 5’s new `mount()` forces you to pass reactive state in (there is no way to do it imperatively as in Svelte 4 anymore), but:

- `.svelte.js` reactivity is janky (state breaks on direct reassignment, unlike in `.svelte` files)
- State generally works best at the top-level, which might not be what you want if you have a lot of components
- Apps not using SvelteKit get left behind, mostly

This package bridges the gap.

## Usage

```ts
import { ImperativeComponent } from "svelte-imperative";
import MyComponent from "./MyComponent.svelte";

const myComponent = new ImperativeComponent(
  document.getElementById("app"),
  MyComponent,
  { message: "Hello, world!", element: "h1" }
);

myComponent.modifyProps({ message: "Goodbye, world!" }); // Partially update props. Becomes { message: 'Goodbye, world!', element: 'h1' }
myComponent.setProps({ message: "Hello, world!", element: "p" }); // Fully update props. Becomes { message: 'Hello, world!', element: 'p' }
myComponent.destroy(); // Destroy the component.
```

`.destroy()` gets called for you automatically once the component goes out of scope if you use `using` (`using const myComponent = ...`).

### Type Safety

The `ImperativeComponent` class will automatically infer types for your props when using TypeScript. To type an instance of a component (like `myComponent` in the example above), you can use the `ImperativeComponentOf<>` generic type:

```ts
import MyComponent from './MyComponent.svelte';
import { ImperativeComponent, type ImperativeComponentOf } from 'svelte-imperative';

const createComponent = (): ImperativeComponentOf<typeof MyComponent> => new ImperativeComponent(...);
const myComponent = createComponent();
```

## License

This project is licensed under [MIT](./LICENSE). You can use it in any project, commercial or not, without attribution (though attribution is cool, of course).

## Contributing

If you want to contribute or report an issue, pull requests and issues are welcome on [GitHub](https://github.com/ezShroom/svelte-imperative).

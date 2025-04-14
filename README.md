# svelte-imperative - imperative components for svelte 5

Svelte provides the [imperative component API](https://svelte.dev/docs/svelte/imperative-component-api) to create components without a framework like SvelteKit. However, it can be difficult to make the props reactive in Svelte 5 because the `mount` function takes a state variable in (instead of returning functions to update props as in Svelte 4), and state runes behave differently in `svelte.js` files than they do in `.svelte` files, making them difficult to manage correctly.

Generally, you should prefer SvelteKit as it does this for you ([even in SPAs](https://svelte.dev/docs/kit/page-options#ssr)), but there are cases where you may still want to use the imperative API, like when using Svelte for only _part_ of a page.

This project provides a class to make handling reactivity in imperative components easier by making prop updates imperative again.

## Installation

```bash
bun i svelte-imperative # (or any other package manager)
```

You'll also need to have Svelte 5 or newer installed. For Svelte 4 and below, use the [`$set` function](https://svelte.dev/docs/svelte/legacy-component-api#$set) with the official imperative component API instead.

## Usage

```ts
import { ReactiveImperativeComponent } from "svelte-imperative";
import MyComponent from "./MyComponent.svelte";

const myComponent = new ReactiveImperativeComponent(
  document.getElementById("app"),
  MyComponent,
  { message: "Hello, world!", element: "h1" }
);

myComponent.modifyProps({ message: "Goodbye, world!" }); // Partially update props. Becomes { message: 'Goodbye, world!', element: 'h1' }
myComponent.setProps({ message: "Hello, world!", element: "p" }); // Fully update props. Becomes { message: 'Hello, world!', element: 'p' }
myComponent.destroy(); // Destroy the component. This is also implemented in the destructor method.
```

### Type Safety

The `ReactiveImperativeComponent` class will automatically infer types for your props when using TypeScript. To type an instance of a component (like `myComponent` in the example above), you can use the `ReactiveImperativeComponentOf<>` generic type:

```ts
import { ReactiveImperativeComponent, type ReactiveImperativeComponentOf } from "svelte-imperative"
import MyComponent from "./MyComponent.svelte";

const myComponent: ReactiveImperativeComponentOf<typeof MyComponent> = new ReactiveImperativeComponent(...)
```

## License

This project is licensed under [MIT](./LICENSE). You can use it in any project, commercial or not, without attribution (though attribution is cool, of course).

## Contributing

If you want to contribute or report an issue, pull requests and issues are welcome on [GitHub](https://github.com/ezShroom/svelte-imperative).

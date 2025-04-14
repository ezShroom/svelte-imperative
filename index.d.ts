import { ReactiveImperativeComponent } from "./logic.svelte";
import { ComponentProps } from "svelte";

export { ReactiveImperativeComponent } from "./logic.svelte";

/**
 * Infers the type of a `ReachtiveImperativeComponent` for a given Svelte component type.
 * This is not strictly necessary for type safety, but can be useful for function return types and similar.
 * @template T The Svelte component type
 * @example
 * ```ts
 * import MyComponent from './MyComponent.svelte';
 * const myComponent: ReactiveImperativeComponentOf<typeof MyComponent> = new ReactiveImperativeComponent(...);
 * ```
 */
export type ReactiveImperativeComponentOf<T> = ReactiveImperativeComponent<
  ComponentProps<T>
>;

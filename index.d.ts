import { ImperativeComponent } from "./logic.svelte";
import { ComponentProps } from "svelte";

export { ImperativeComponent };

/**
 * Infers the type of an `ImperativeComponent` for a given Svelte component type.
 * This is not strictly necessary for type safety, but can be useful for function return types and similar.
 * @template T The Svelte component type
 * @example
 * ```ts
 * import MyComponent from './MyComponent.svelte';
 * const createComponent = (): ImperativeComponentOf<typeof MyComponent> => new ImperativeComponent(...);
 * const myComponent = createComponent();
 * ```
 */
export type ImperativeComponentOf<T> = ImperativeComponent<ComponentProps<T>>;

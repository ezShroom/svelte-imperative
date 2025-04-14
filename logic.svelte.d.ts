import type { Component, ComponentProps } from "svelte";

/**
 * A wrapper class for imperatively managing Svelte components with reactive props.
 * Provides type-safe methods for mounting, updating props, and cleanup.
 * @template T The props type for the wrapped component
 */
export declare class ReactiveImperativeComponent<
  T extends Record<string, unknown>
> {
  /**
   * Creates and mounts a new Svelte component with reactive props.
   * @param {HTMLElement} container The DOM element to mount the component into
   * @param {import('svelte').Component<T, object, string>} component The Svelte component to mount
   * @param {T} initialProps Initial props to pass to the component
   * @example
   * ```ts
   * import MyComponent from './MyComponent.svelte';
   * const myComponent = new ReactiveImperativeComponent(
   * 	document.getElementById('app'),
   * 	MyComponent,
   * 	{ message: 'Hello, world!' }
   * )
   */
  constructor(
    container: HTMLElement,
    component: Component<T, object, string>,
    initialProps: T
  );

  /**
   * Replaces all props with a new set of props.
   * @param {T} newProps The new props object that will completely replace existing props
   */
  setProps(newProps: T): void;

  /**
   * Updates a subset of props while preserving other prop values.
   * @param {Partial<T>} partialProps Object containing only the props you want to update
   */
  modifyProps(partialProps: Partial<T>): void;

  /**
   * Unmounts the component and cleans up all references.
   * Should be called when the component is no longer needed.
   * The destructor also implicitly calls destroy.`
   */
  destroy(): void;

  /**
   * Automatically unmounts the component and cleans up when the instance is garbage collected.
   * Ensures cleanup even if destroy() isn't explicitly called.
   */
  [Symbol.dispose](): void;
}

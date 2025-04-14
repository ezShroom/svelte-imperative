/// <reference types="./logic.svelte.d.ts" />

import { mount, unmount } from "svelte";

/**
 * A wrapper class for imperatively managing Svelte components with reactive props.
 * Provides type-safe methods for mounting, updating props, and cleanup.
 * @template T The props type for the wrapped component
 */
export class ReactiveImperativeComponent {
  /** @type {import('svelte').SvelteComponent} */
  #mountedComponent;
  /** @type {T} */
  #props = $state({});

  /**
   * Creates and mounts a new Svelte component with reactive props.
   * @param {HTMLElement} container The DOM element to mount the component into
   * @param {import('svelte').Component<T, object, string>} component The Svelte component to mount
   * @param {T} initialProps Initial props to pass to the component
   */
  constructor(container, component, initialProps) {
    Object.assign(this.#props, initialProps);
    this.#mountedComponent = mount(component, {
      target: container,
      intro: true,
      props: this.#props,
    });
  }

  /**
   * Replaces all props with a new set of props.
   * @param {T} newProps The new props object that will completely replace existing props
   */
  setProps(newProps) {
    Object.assign(this.#props, newProps);
  }

  /**
   * Updates a subset of props while preserving other prop values.
   * @param {Partial<T>} partialProps Object containing only the props you want to update
   */
  modifyProps(partialProps) {
    Object.assign(this.#props, {
      ...this.#props,
      ...partialProps,
    });
  }

  /**
   * Unmounts the component and cleans up all references.
   * Should be called when the component is no longer needed.
   * The destructor also implicitly calls destroy.`
   */
  destroy() {
    this.#destroy();
  }

  #destroy() {
    if (!this.#mountedComponent) return;
    unmount(this.#mountedComponent, { outro: true });
    this.#mountedComponent = undefined;
    this.#props = undefined;
  }

  /**
   * Automatically unmounts the component and cleans up when the instance is garbage collected.
   * Ensures cleanup even if destroy() isn't explicitly called.
   */
  [Symbol.dispose]() {
    this.#destroy();
  }
}

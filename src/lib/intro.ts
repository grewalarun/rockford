import type Lenis from "lenis";

let done = false;
const callbacks = new Set<() => void>();

/** Called by the preloader once the page wipe is under way. */
export function markIntroDone() {
  done = true;
  callbacks.forEach((cb) => cb());
  callbacks.clear();
}

/** Run `cb` when the intro finishes (immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  callbacks.add(cb);
  return () => {
    callbacks.delete(cb);
  };
}

let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenisInstance = l;
};
export const getLenis = () => lenisInstance;

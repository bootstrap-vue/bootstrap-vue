import { create } from "./object";

export default function memoize(fn) {
    const cache = create(null);

    return function memoizedFn() {
        const args = JSON.stringify(arguments);
        return (cache[args] = cache[args] || fn.apply(null, arguments));
    };
}

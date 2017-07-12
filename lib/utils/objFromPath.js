export default function objFromPath(path, setValue) {
    let ref;

    return path.split(".").reduce((memo, key, idx, ary) => {
        // During the first iteration,
        // ref needs to be set to the memo object.
        if (!ref) {
            ref = memo;
        }

        // Grab a ref to the memo object's current key
        ref[key] = {};

        // If it's the last iteration,
        // set the value (if given)
        // and return the memo object.
        if (idx + 1 === ary.length) {
            if (setValue !== undefined) {
                ref[key] = setValue;
            }
            return memo;
        }

        // Update the ref for the next nested obj key.
        ref = ref[key];

        return memo;
    }, {});
}

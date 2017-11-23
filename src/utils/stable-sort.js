/*
 * Consitant and stable sort function across JavsaScript platforms
 *
 * Inconsistant sorts can cause SSR problems between client and server
 * such as in <b-table> if sortBy is applied to the data on server side render.
 * Chrome and V8 native sorts are inconsistant/unstable
 *
 * This function uses native sort with fallback to index compare when the a and b
 * compare returns 0
 *
 * Algorithm bsaed on:
 * https://stackoverflow.com/questions/1427608/fast-stable-sorting-algorithm-implementation-in-javascript/45422645#45422645
 *
 * @param {array} array to sort
 * @param {function} sortcompare function
 * @return {array}
 */

export default function stableSort (array, compareFn) {
  return array
    .map((a, index) => [ index, a ])
    .sort(function (a, b) { return this(a[1], b[1]) || a[0] - b[0] }.bind(compareFn))
    .map(e => e[1])
}

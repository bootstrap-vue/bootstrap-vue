/**
 * Strip <script> tags from string
 *
 * Given an string, removes all occurences of HTML <script> tags
 *
 * @param {string} stringToStrip
 * @return {string}
 */
export default function stripScripts(str = '') {
  return String(str).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}

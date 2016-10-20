var inBrowser = typeof window !== 'undefined';

// pulled from http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
export function uniqueId() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// check if browser support css3 transitions
export function csstransitions() {
  if (typeof (document) === 'undefined')
    return false;
  const style = document.documentElement.style;
  return (
    style.webkitTransition !== undefined ||
    style.MozTransition !== undefined ||
    style.OTransition !== undefined ||
    style.MsTransition !== undefined ||
    style.transition !== undefined
  )
}

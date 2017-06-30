const isArray =
    typeof Array.isArray === "function"
        ? Array.isArray
        : obj => Object.prototype.toString.call(obj) === "[object Array]"

export default isArray

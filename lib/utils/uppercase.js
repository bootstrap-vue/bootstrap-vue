export default function uppercase(str) {
    str = String(str);
    return str.charAt(0).toUpperCase() + str.slice(1);
}

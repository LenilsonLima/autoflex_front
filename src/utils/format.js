export function money(v) {
    if (v === null || v === undefined) return "";
    const n = typeof v === "string" ? Number(v) : v;
    if (Number.isNaN(n)) return String(v);
    return n.toFixed(2);
}
export function pickRandom<T>(arr: Array<T>) : T | null {
    if (arr && arr.length) {
        return arr[Math.floor(Math.random() * arr.length)];
    } else {
        // TODO use an Optional class instead
        return null;
    }
}

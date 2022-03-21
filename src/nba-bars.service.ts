export const endpoint = "NBA_API_ENDPOINT";

export async function getNbaBars(gameId) {
    const res = await fetch(`${endpoint}/bars/${gameId}`);
    if (res.ok) {
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error("problem");
        }
    }
}

export async function getGames(date) {
    const res = await fetch(`${endpoint}/games/${date}`)
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error("problem");
    }
}

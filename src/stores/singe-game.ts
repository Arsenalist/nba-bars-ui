import { writable, derived } from 'svelte/store';

export const gameData = writable();

export const awayPlayers = derived(gameData, gameData => gameData !== undefined ? gameData.awayTeam.players : undefined);
export const homePlayers = derived(gameData, gameData => gameData !== undefined ? gameData.homeTeam.players : undefined);

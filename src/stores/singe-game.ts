import {writable, derived} from 'svelte/store';

export const gameData = writable();
export const player = writable();

export const awayPlayers = derived(gameData, ($gameData: any) => $gameData !== undefined ? $gameData.awayTeam.players : undefined);
export const homePlayers = derived(gameData, ($gameData: any) => $gameData !== undefined ? $gameData.homeTeam.players : undefined);
export const lineupGraphData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        lineups: $gameData.lineups,
        boxScore: $gameData.boxScore,
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText
    }
});

export const awayPlayersLineupGraphData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        playerLineups: $gameData.awayPlayerLineups,
        team: $gameData.boxScore.awayTeam,
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText
    }
});

export const homePlayersLineupGraphData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        playerLineups: $gameData.homePlayerLineups,
        team: $gameData.boxScore.homeTeam,
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText
    }
});

export const differentialData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        differential: $gameData.differential,
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        boxScore: $gameData.boxScore,
    }
});

export const awayTeamShotDistanceData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        made: $gameData.awayTeam.shotDistance.filter(sd => sd.action.shotResult === "Made"),
        missed: $gameData.awayTeam.shotDistance.filter(sd => sd.action.shotResult === "Missed"),
        title: `${$gameData.boxScore.awayTeam.teamName} Shot Distance`
    }
});

export const homeTeamShotDistanceData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        made: $gameData.homeTeam.shotDistance.filter(sd => sd.action.shotResult === "Made"),
        missed: $gameData.homeTeam.shotDistance.filter(sd => sd.action.shotResult === "Missed"),
        title: `${$gameData.boxScore.homeTeam.teamName} Shot Distance`
    }
});


export const teamPointsInThePaintGraphData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        boxScore: $gameData.boxScore,
        awayData: $gameData.awayTeam.pointsInThePaint,
        homeData: $gameData.homeTeam.pointsInThePaint,
        title: 'Points in the Paint',
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        teamStatistic: 'pointsInThePaint'
    }
});


export const teamFastBreakPointsGraphData = derived(gameData, ($gameData: any) => {
    if ($gameData === undefined) return undefined;
    return {
        boxScore: $gameData.boxScore,
        awayData: $gameData.awayTeam.pointsFastBreak,
        homeData: $gameData.homeTeam.pointsFastBreak,
        title: 'Fastbreak Points',
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        teamStatistic: 'pointsFastBreak'
    }
});

export const teamPointsOffTurnoversGraphData = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return {
        boxScore: $gameData.boxScore,
        awayData: $gameData.awayTeam.pointsFromTurnovers,
        homeData: $gameData.homeTeam.pointsFromTurnovers,
        title: 'Points Off Turnovers',
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        teamStatistic: 'pointsFromTurnovers'
    }
});

export const timeoutAnalysis = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return $gameData.timeoutAnalysis;
});

export const boxScore = derived(gameData, ($gameData: any) =>  {
    if ($gameData === undefined) return undefined;
    return $gameData.boxScore;
});

export const periodBarChartsGraphData = derived([gameData, player], ([$gameData, $player]: any[]) =>  {
    if ($gameData === undefined || $player === undefined) return undefined;
    return {
        chartLabels: $gameData.chartLabels,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        player: $player
    }
});

export const assistDistributionGraphData = derived([gameData, player], ([$gameData, $player]: any[]) =>  {
    if ($gameData === undefined || $player === undefined) return undefined;
    return {
        player: $player.player,
        allAssistDistributions: $gameData.awayTeam.assistDistribution.concat($gameData.homeTeam.assistDistribution)
    }
});

export const playerShotDistanceData = derived([gameData, player], ([$gameData, $player]: any[]) =>  {
    if ($gameData === undefined || $player === undefined) return undefined;
    const allShots = $gameData.awayTeam.shotDistance.concat($gameData.homeTeam.shotDistance);
    return {
        lineupIntervals: $gameData.lineupIntervals,
        lineupIntervalsText: $gameData.lineupIntervalsText,
        made: allShots.filter(sd => sd.action.shotResult === "Made" && sd.action.personId === $player.player.personId),
        missed: allShots.filter(sd => sd.action.shotResult === "Missed" && sd.action.personId === $player.player.personId),
        title: `Shot Distance`
    }
});

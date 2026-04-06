export interface Team {
  TeamID: string;
  TeamCode: string;
  TeamName: string;
  TeamLogo: string;
  Matches: string;
  Wins: string;
  Loss: string;
  Points: string;
  NetRunRate: string;
  ForTeams?: string;
  AgainstTeam?: string;
}

export interface StandingsData {
  points: Team[];
}

export function fetchStandings(): Promise<StandingsData>;

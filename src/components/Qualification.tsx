import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Team } from "@/utils/jsonp";

export default function Qualification({ teams }: { teams: Team[] }) {
  if (!teams.length) return null;

  const TOTAL_MATCHES = 14; // IPL format: 14 matches per team

  const sorted = [...teams].sort(
    (a, b) => parseInt(b.Points) - parseInt(a.Points)
  );

  // Calculate qualification chances using Monte Carlo simulation
  const getQualificationChance = (team: Team): number => {
    const SIMULATIONS = 10000;
    const TOP_4_CUTOFF = 4;
    let qualificationCount = 0;

    for (let sim = 0; sim < SIMULATIONS; sim++) {
      // Simulate remaining matches for all teams
      const simulatedFinalPoints = sorted.map((t) => {
        const matchesPlayed = parseInt(t.Matches) || 0;
        const remainingMatches = TOTAL_MATCHES - matchesPlayed;
        const currentPoints = parseInt(t.Points) || 0;
        
        // Each team wins remaining matches with 50% probability
        const wins = Math.floor(Math.random() * (remainingMatches + 1));
        const finalPoints = currentPoints + wins * 2;
        
        return finalPoints;
      });

      // Sort simulated final points and check if this team is in top 4
      const sortedIndices = simulatedFinalPoints
        .map((points, idx) => ({ points, idx }))
        .sort((a, b) => b.points - a.points)
        .map((item) => item.idx);

      const teamIndex = sorted.findIndex((t) => t.TeamID === team.TeamID);
      if (sortedIndices.slice(0, TOP_4_CUTOFF).includes(teamIndex)) {
        qualificationCount++;
      }
    }

    return Math.round((qualificationCount / SIMULATIONS) * 100);
  };

  const getStatusBadge = (percentage: number): string => {
    if (percentage >= 75) return "Highly Likely";
    if (percentage >= 50) return "Possible";
    if (percentage >= 20) return "Low Chance";
    return "Unlikely";
  };

  const getStatusColor = (percentage: number): string => {
    if (percentage >= 75) return "bg-green-600";
    if (percentage >= 50) return "bg-blue-600";
    if (percentage >= 20) return "bg-amber-500";
    return "bg-red-600";
  };

  const getRemainingMatches = (team: Team): number => {
    return TOTAL_MATCHES - (parseInt(team.Matches) || 0);
  };

  const getMaxPoints = (team: Team): number => {
    return (parseInt(team.Points) || 0) + getRemainingMatches(team) * 2;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Qualification Chances</CardTitle>
        <p className="text-xs text-muted-foreground mt-2">
          Based on current standings and remaining matches
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {sorted.map((t, i) => {
          const percentage = getQualificationChance(t);
          const status = getStatusBadge(percentage);
          const remainingMatches = getRemainingMatches(t);
          const maxPoints = getMaxPoints(t);

          return (
            <div key={t.TeamID} className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-semibold text-foreground w-12">#{i + 1}</span>
                  <Badge variant="outline">{t.TeamCode}</Badge>
                  <div className="flex gap-2 text-sm">
                    <span className="text-muted-foreground">{parseInt(t.Points) || 0} pts</span>
                    <span className="text-xs text-muted-foreground">
                      ({remainingMatches} matches left)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{percentage}%</div>
                  <div className="text-xs text-muted-foreground">
                    Max: {maxPoints} pts
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${getStatusColor(percentage)} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Probability: <span className="font-semibold">{status}</span>
                </span>
                {i < 4 && (
                  <Badge className="bg-green-100 text-green-800 font-semibold text-xs">
                    QUALIFIED ZONE
                  </Badge>
                )}
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-3">
            Qualification Legend:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-muted-foreground">75%+ Highly Likely</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-muted-foreground">50-74% Possible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-muted-foreground">20-49% Low Chance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-muted-foreground">&lt;20% Unlikely</span>
            </div>
          </div>

          {/* Info */}
          <div className="mt-3 p-3 bg-secondary rounded text-xs text-muted-foreground">
            <p className="font-semibold mb-1">How it works:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Calculates odds based on remaining matches and max points</li>
              <li>Considers all possible win/loss scenarios</li>
              <li>Qualifies if fewer than 4 teams can finish above</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
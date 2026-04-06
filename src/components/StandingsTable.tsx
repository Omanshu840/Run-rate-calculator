import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Team } from "@/utils/jsonp";

export default function StandingsTable({ teams }: { teams: Team[] }) {
  if (!teams.length) return <div>Loading...</div>;

  const TOTAL_MATCHES = 14;
  const TOP_4_CUTOFF = 4;

  // Calculate qualification chances using Monte Carlo simulation
  const getQualificationChance = (team: Team): number => {
    const SIMULATIONS = 10000;
    const sorted = [...teams].sort((a, b) => parseInt(b.Points) - parseInt(a.Points));
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

  const sorted = [...teams].sort((a, b) => parseInt(b.Points) - parseInt(a.Points));

  return (
    <>
      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>M</TableHead>
                <TableHead>W</TableHead>
                <TableHead>L</TableHead>
                <TableHead>Pts</TableHead>
                <TableHead>NRR</TableHead>
                <TableHead>Qualification</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sorted.map((t, i) => {
                const percentage = getQualificationChance(t);
                const status = getStatusBadge(percentage);

                return (
                  <TableRow key={t.TeamID}>
                    <TableCell>
                      {i < 4 ? (
                        <Badge>{i + 1}</Badge>
                      ) : (
                        i + 1
                      )}
                    </TableCell>

                    <TableCell className="flex items-center gap-2">
                      <img
                        src={t.TeamLogo}
                        className="w-8 h-8 rounded-full"
                      />
                      {t.TeamCode}
                    </TableCell>

                    <TableCell>{t.Matches}</TableCell>
                    <TableCell>{t.Wins}</TableCell>
                    <TableCell>{t.Loss}</TableCell>
                    <TableCell>{t.Points}</TableCell>

                    <TableCell
                      className={
                        parseFloat(t.NetRunRate) > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {t.NetRunRate}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="w-16 bg-secondary rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${getStatusColor(percentage)} transition-all duration-300`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-semibold min-w-12">
                          {percentage}%
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {status}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {sorted.map((t, i) => {
          const percentage = getQualificationChance(t);
          const status = getStatusBadge(percentage);

          return (
            <Card key={t.TeamID} className="py-0">
              <CardContent className="pt-3 pb-3">
                <div className="space-y-2">
                  {/* Header with rank and team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        {i < 4 ? (
                          <Badge className="text-sm">{i + 1}</Badge>
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">
                            #{i + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={t.TeamLogo}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-semibold">{t.TeamCode}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.Points} pts
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{percentage}%</div>
                      <div className="text-xs text-muted-foreground">
                        {status}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatusColor(percentage)} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-4 gap-1 pt-1">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">M</div>
                      <div className="text-sm font-semibold">{t.Matches}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">W</div>
                      <div className="text-sm font-semibold">{t.Wins}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">L</div>
                      <div className="text-sm font-semibold">{t.Loss}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">NRR</div>
                      <div
                        className={`text-sm font-semibold ${
                          parseFloat(t.NetRunRate) > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {t.NetRunRate}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
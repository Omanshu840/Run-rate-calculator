import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Team } from "@/utils/jsonp";

interface SimulationResult {
  a: string;
  b: string;
  teamA: string;
  teamB: string;
}

export default function Simulator({ teams }: { teams: Team[] }) {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");

  const [runsA, setRunsA] = useState("");
  const [oversANum, setOversANum] = useState("");
  const [ballsA, setBallsA] = useState("");
  const [runsB, setRunsB] = useState("");
  const [oversBNum, setOversBNum] = useState("");
  const [ballsB, setBallsB] = useState("");

  const [result, setResult] = useState<SimulationResult | null>(null);

  const convertOversToDecimal = (overs: string, balls: string): string => {
    if (!overs && overs !== "0") return "";
    const oversNum = parseInt(overs);
    const ballsNum = parseInt(balls || "0");
    return (oversNum + ballsNum / 6).toFixed(1);
  };

  const simulate = () => {
    const tA = teams.find((t) => t.TeamID === teamA);
    const tB = teams.find((t) => t.TeamID === teamB);

    if (!tA || !tB) return;

    const oversADecimal = convertOversToDecimal(oversANum, ballsA);
    const oversBDecimal = convertOversToDecimal(oversBNum, ballsB);

    const calcNRR = (
      team: Team,
      scored: string,
      faced: string,
      against: string,
      oversAgainst: string
    ): string => {
      const [runsFor, oversFor] = (team.ForTeams || "0/0").split("/");
      const [runsAgainst, oversOld] = (team.AgainstTeam || "0/0").split("/");

      const totalFor =
        parseInt(runsFor) + parseInt(scored || "0");
      const totalAgainst =
        parseInt(runsAgainst) + parseInt(against || "0");

      const totalOversFor =
        parseFloat(oversFor) + parseFloat(faced || "0");
      const totalOversAgainst =
        parseFloat(oversOld) + parseFloat(oversAgainst || "0");

      return (
        totalFor / totalOversFor -
        totalAgainst / totalOversAgainst
      ).toFixed(3);
    };

    setResult({
      a: calcNRR(tA, runsA, oversADecimal, runsB, oversBDecimal),
      b: calcNRR(tB, runsB, oversBDecimal, runsA, oversADecimal),
      teamA: tA.TeamCode,
      teamB: tB.TeamCode,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Match Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Team Selection Section */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Select Teams</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-2">Team A</label>
              <Select onValueChange={setTeamA}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Team A" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((t) => (
                    <SelectItem
                      key={t.TeamID}
                      value={t.TeamID}
                    >
                      {t.TeamCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-2">Team B</label>
              <Select onValueChange={setTeamB}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Team B" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((t) => (
                    <SelectItem
                      key={t.TeamID}
                      value={t.TeamID}
                    >
                      {t.TeamCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Performance Data Section */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Match Stats</h4>
          
          <div className="bg-secondary rounded-lg p-4 mb-4 border border-border">
            <p className="text-xs font-semibold text-foreground mb-3">Team A Performance</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Runs</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={runsA}
                  onChange={(e) => setRunsA(e.target.value)}
                  className="h-9"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Overs</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={oversANum}
                  onChange={(e) => setOversANum(e.target.value)}
                  className="h-9"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Balls</label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="5"
                  value={ballsA}
                  onChange={(e) => setBallsA(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4 border border-border">
            <p className="text-xs font-semibold text-foreground mb-3">Team B Performance</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Runs</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={runsB}
                  onChange={(e) => setRunsB(e.target.value)}
                  className="h-9"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Overs</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={oversBNum}
                  onChange={(e) => setOversBNum(e.target.value)}
                  className="h-9"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Balls</label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="5"
                  value={ballsB}
                  onChange={(e) => setBallsB(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Simulate Button */}
        <Button
          onClick={simulate}
          disabled={!teamA || !teamB || !runsA || !oversANum || !runsB || !oversBNum}
          className="w-full h-10 font-semibold"
        >
          Calculate NRR
        </Button>

        {/* Results Section */}
        {result && (
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">Simulation Results</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">NRR</p>
                <Badge variant="secondary" className="text-base">
                  {result.teamA}
                </Badge>
                <p className="text-xs font-bold text-foreground mt-2">{result.a}</p>
              </div>
              <div className="bg-background rounded p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">NRR</p>
                <Badge variant="secondary" className="text-base">
                  {result.teamB}
                </Badge>
                <p className="text-xs font-bold text-foreground mt-2">{result.b}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
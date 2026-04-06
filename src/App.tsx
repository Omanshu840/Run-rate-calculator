import { useEffect, useState } from "react";
import { fetchStandings } from "./utils/jsonp";
import type { StandingsData } from "./utils/jsonp";
import StandingsTable from "./components/StandingsTable";
import Simulator from "./components/Simulator";
import NRRChart from "./components/NRRChart";

export default function App() {
  const [teams, setTeams] = useState<StandingsData["points"]>([]);

  useEffect(() => {
    fetchStandings().then((data: StandingsData) => {
      setTeams(data.points);
    });
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold">NRR Simulator</h1>
          <p className="text-slate-400">IPL 2026</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StandingsTable teams={teams} />
          </div>
          <Simulator teams={teams} />
        </div>

        <NRRChart teams={teams} />
      </div>
    </div>
  );
}
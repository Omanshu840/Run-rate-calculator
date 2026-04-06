import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import type { Team } from "@/utils/jsonp";

export default function NRRChart({ teams }: { teams: Team[] }) {
  if (!teams.length) return null;

  const data = teams.map((t) => ({
    name: t.TeamCode,
    nrr: parseFloat(t.NetRunRate),
  }));

  return (
    <Card>
      <CardContent>
        <h3 className="mb-4">NRR Comparison</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Bar dataKey="nrr" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.nrr > 0
                      ? "#22c55e"
                      : "#ef4444"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
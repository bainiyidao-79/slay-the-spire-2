import Link from "next/link";

type Row = {
  name: string;
  path?: string;
  tier?: string;
  cost?: string;
  type?: string;
  rarity?: string;
};

const tierStyle: Record<string, string> = {
  S: "border-red-500/30 bg-red-500/15 text-red-400",
  A: "border-orange-500/30 bg-orange-500/15 text-orange-400",
  B: "border-yellow-500/30 bg-yellow-500/15 text-yellow-500",
  C: "border-sky-500/30 bg-sky-500/15 text-sky-400",
  D: "border-zinc-500/30 bg-zinc-500/15 text-zinc-400",
};

// 卡牌表：栏目 cards.json 数据驱动渲染（档位徽章/费用/类型/稀有度）
export function CardTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Card</th>
            <th className="px-3 py-2">Tier</th>
            <th className="px-3 py-2">Cost</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Rarity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t">
              <td className="px-3 py-2 font-medium text-foreground">
                {r.path ? (
                  <a className="hover:underline" href={`/${r.path}`}>
                    {r.name}
                  </a>
                ) : (
                  r.name
                )}
              </td>
              <td className="px-3 py-2">
                {r.tier ? (
                  <span
                    className={`rounded border px-1.5 py-0.5 text-xs font-semibold ${
                      tierStyle[r.tier] ?? ""
                    }`}
                  >
                    {r.tier}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{r.cost ?? "—"}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.type ?? "—"}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.rarity ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

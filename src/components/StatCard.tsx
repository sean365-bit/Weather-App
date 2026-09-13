import type { StatCardProps } from "../types/ComponentTypes";

function StatCard({ title, value, unit, loading, notFound }: StatCardProps) {
  const hasValue = value !== null && value !== undefined;

  if (loading)
    return (
      <div className="stats_card">
        <p className="stats_title">{title}</p>
        <div className="stats_content">
          <p>--</p>
        </div>
      </div>
    );

  if (!hasValue || notFound) return null;

  return (
    <div className="stats_card">
      <p className="stats_title">{title}</p>
      <div className="stats_content">
        <p>
          {value}
          {unit ? ` ${unit}` : ""}
        </p>
      </div>
    </div>
  );
}

export default StatCard;

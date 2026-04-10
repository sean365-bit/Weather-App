import Loading from "./Loading";
import type { StatCardProps } from "../types/ComponentTypes";

function StatCard({ title, value, unit, loading }: StatCardProps) {
  return (
    <div className="stats_card">
      <p className="stats_title">{title}</p>
      <div className="stats_content">
        {loading ? (
          <Loading />
        ) : value != null ? (
          <p>
            {value}
            {unit ? ` ${unit}` : ""}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default StatCard;

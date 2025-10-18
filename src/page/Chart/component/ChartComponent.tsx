// src/components/ChartComponent.tsx

import { useMemo } from "react";
import useChart from "../hooks/usechart";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";


export default function ChartComponent() {
  const { dataItems, isDark, loadingComponent, COLORS } = useChart();

  // 🔹 Group projects by category & calculate percentage
  const chartData = useMemo(() => {
    if (!dataItems.length) return [];

    const total = dataItems.length;
    const categoryCount: Record<string, number> = {};

    dataItems.forEach((item: any) => {
      const category = item.category || "Unknown";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      percentage: ((count / total) * 100).toFixed(2),
    }));
  }, [dataItems]);

  if (loadingComponent) return <p className="text-center">Loading chart...</p>;

  return (
    <div
      className={`flex justify-center items-center flex-col p-6 rounded-2xl shadow-md ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Project Categories</h2>

      {chartData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry.category} (${entry.percentage}%)`}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#fff",
              color: isDark ? "#fff" : "#000",
            }}
          />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

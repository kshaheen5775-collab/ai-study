import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { MathGraph as MathGraphType } from '../types';

interface MathGraphProps {
  data: MathGraphType;
}

const MathGraph: React.FC<MathGraphProps> = ({ data }) => {
  if (!data || !data.dataPoints || data.dataPoints.length === 0) return null;

  // Simple heuristic: if more than 5 points, use Line, otherwise Scatter
  const isLine = data.dataPoints.length > 5;

  return (
    <div className="w-full h-64 md:h-80 bg-white p-4 rounded-lg shadow-sm border border-slate-200 mt-4">
      <h3 className="text-center font-bold text-slate-700 mb-2">{data.title || "Graph"}</h3>
      <ResponsiveContainer width="100%" height="100%">
        {isLine ? (
          <LineChart
            data={data.dataPoints}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              type="number" 
              label={{ value: data.xLabel || 'x', position: 'insideBottomRight', offset: -5 }} 
              domain={['auto', 'auto']}
            />
            <YAxis 
              label={{ value: data.yLabel || 'y', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        ) : (
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="x" />
            <YAxis type="number" dataKey="y" name="y" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Points" data={data.dataPoints} fill="#8884d8" />
          </ScatterChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default MathGraph;
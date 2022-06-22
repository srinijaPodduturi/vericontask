import React, { FC } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  Legend,
} from 'recharts';
import { objToArray } from 'utils/utils';
import { PieChartWrapper } from './styles';
import { PieChartsProps } from './types';

const COLORS: any = {
  Ok: 'green',
  Failed: 'red',
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel: FC = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieCharts = ({ data, onDeviceClick }: PieChartsProps) => {
  const getTotal = (deviceTypeSummary: any) => {
    return deviceTypeSummary.reduce(
      (tot: number, dev: any) => tot + dev.value,
      0,
    );
  };

  const renderPie = (
    deviceType: string,
    deviceTypeSummary: object[],
    renderLegend: boolean,
  ) => {
    return (
      <ResponsiveContainer width="100%" height="100%" key={deviceType}>
        <PieChart >
          <Pie
            data={deviceTypeSummary}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={100}
            fill="#0d8039"
            label={renderCustomizedLabel}
            isAnimationActive={false}
          >
            {deviceTypeSummary.map((entry: any, index: number) => (
              <Cell fill={COLORS[entry.name]} key={index} />
            ))}
            <Label
              width={90}
              position="center"
              onClick={() => onDeviceClick(deviceType)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {`${deviceType} ${getTotal(deviceTypeSummary)}`}
            </Label>
          </Pie>

          <Tooltip />
          {renderLegend && (
            <Legend layout="horizontal" verticalAlign="top" align="center" />
          )}
        </PieChart>
      </ResponsiveContainer>
    );
  };

  if (data == null || Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <PieChartWrapper>
      {Object.keys(data)?.map((type: string, index: number) =>
        renderPie(type, objToArray(data[type]), index === 2),
      )}
    </PieChartWrapper>
  );
};

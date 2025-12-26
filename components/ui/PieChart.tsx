'use client';

import { ResponsivePie } from '@nivo/pie';

type PieChartProps = {
    data: {
        id: string;
        value: number;
        label?: string;
        color?: string;
    }[];
};

export const PieChart = ({ data }: PieChartProps) => {
    return (
        <div className="w-full h-[250px]">
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                borderWidth={2}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#a3a3a3"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]],
                }}
                theme={{
                    background: 'transparent',
                    text: {
                        fontSize: 12,
                        fill: '#ededed',
                        fontFamily: 'inherit',
                    },
                    tooltip: {
                        container: {
                            background: '#1a1a1a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            color: '#ededed',
                        },
                    },
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 60,
                        itemsSpacing: 10,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#a3a3a3',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: 'circle',
                    },
                ]}
            />
        </div>
    );
};

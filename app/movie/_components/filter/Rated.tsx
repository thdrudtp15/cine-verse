import React, { useEffect, useState } from 'react';

import Section from './Section';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import useParams from '@/hooks/useParams';

const Rated = React.memo(() => {
    const [rate, setRate] = useState({
        min: 0,
        max: 10,
    });

    const { setParams } = useParams();

    useEffect(() => {
        if (rate.min === 0 && rate.max === 10) {
            return;
        }

        const STO = setTimeout(() => {
            setParams('rate', `${rate.min},${rate.max}`);
        }, 300);

        return () => clearTimeout(STO);
    }, [rate.min, rate.max]);

    return (
        <Section title="평점">
            <div className="px-2 py-4">
                <RangeSlider
                    min={0}
                    max={10}
                    step={0.5}
                    defaultValue={[0, 10]}
                    onInput={(e) => setRate({ min: e[0], max: e[1] })}
                />
            </div>
            <div className="flex items-center justify-between px-2">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-foreground-muted">최저</span>
                    <span className="text-lg font-bold text-foreground">{rate.min.toFixed(1)}</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4" />
                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-foreground-muted">최고</span>
                    <span className="text-lg font-bold text-foreground">{rate.max.toFixed(1)}</span>
                </div>
            </div>
        </Section>
    );
});

Rated.displayName = 'Rated';
export default Rated;

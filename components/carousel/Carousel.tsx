'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButton';

import './carousel.css';

type PropType = {
    options?: EmblaOptionsType;
    children: React.ReactNode;
};

const OPTIONS: EmblaOptionsType = { dragFree: true };

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { children } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
    const [scrollProgress, setScrollProgress] = useState(0);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('reInit', onScroll).on('scroll', onScroll).on('slideFocus', onScroll);

        // 초기 상태를 비동기적으로 설정
        requestAnimationFrame(() => {
            onScroll(emblaApi);
        });
    }, [emblaApi, onScroll]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">{children}</div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__progress">
                    <div
                        className="embla__progress__bar"
                        style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;

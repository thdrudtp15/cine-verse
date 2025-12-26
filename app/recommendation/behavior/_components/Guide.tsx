'use client';

import { Heart, Clock, ExternalLink, Play, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const behaviorItems = [
    {
        icon: Heart,
        title: '위시리스트 추가',
        description: '위시리스트 영화 분석',
    },
    {
        icon: Clock,
        title: '영화 상세 페이지 5초 이상 체류',
        description: '영화 상세 페이지 체류 시간 분석',
    },
    {
        icon: ExternalLink,
        title: '스트리밍 사이트 이동',
        description: '스트리밍 사이트 이동 분석',
    },
    {
        icon: Play,
        title: '예고편 감상',
        description: '영화 예고편 감상 분석',
    },
];

const Guide = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-background-elevated border border-border rounded-lg overflow-hidden mb-8 shadow-lg shadow-black/20">
            {/* 헤더 - 클릭 가능 영역 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-background-tertiary transition-colors duration-200 text-left"
            >
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0"></span>
                    <h2 className="text-xl font-semibold text-foreground">행동분석이란?</h2>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-foreground-secondary transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* 아코디언 콘텐츠 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0 border-t border-divider">
                            <p className="text-foreground-secondary mb-6 leading-relaxed pt-6">
                                사용자의 다양한 행동 패턴을 수집하고 분석하여 개인화된 영화 추천을 제공합니다.
                                <br />
                                아래의 행동 데이터를 통해 취향과 관심사를 파악합니다.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {behaviorItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-4 bg-background-tertiary rounded-lg border border-border hover:border-accent-primary/30 transition-all duration-200"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-accent-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-foreground mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-foreground-muted">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Guide;

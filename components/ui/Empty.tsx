import React from 'react';
import { VideoOff } from 'lucide-react';

type EmptyProps = {
    title?: string;
    description?: string;
    action?: React.ReactNode;
};

const Empty = ({ title = '콘텐츠가 없습니다', description, action }: EmptyProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 w-full gap-4">
            <VideoOff className="w-16 h-16 text-foreground-muted" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            {description && <p className="text-sm text-foreground-muted leading-relaxed">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
};

export default Empty;

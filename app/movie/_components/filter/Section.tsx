import React from 'react';

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

const Section = React.memo(({ title, children }: SectionProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{title}</h3>
            {children}
        </div>
    );
});

Section.displayName = 'Section';

export default Section;

'use client';
import { useEffect, useState } from 'react';
import ExistImage from '@/components/ui/ExistImage';
import NotExistImage from '@/components/ui/NotExistImage';
import ActorModal from '@/components/modal/ActorModal';

interface Actor {
    id: number;
    original_name: string;
    profile_path: string;
    character: string;
}

const ActorItem = ({ actor }: { actor: Actor }) => {
    return (
        <div key={actor.id} className="rounded-lg w-40 ">
            <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
                {actor.profile_path ? (
                    <ExistImage
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.original_name}
                        fill
                        loading="lazy"
                        className="object-cover object-center"
                        sizes="300px"
                    />
                ) : (
                    <NotExistImage />
                )}
            </div>
            <div>
                <h3 className="text-lg font-bold line-clamp-1">{actor.original_name}</h3>
                <p className="text-sm text-(--foreground-muted) line-clamp-1">{actor.character}</p>
            </div>
        </div>
    );
};

const Actors = ({ actors }: { actors: Actor[] }) => {
    return (
        <>
            <div className="w-fit  overflow-hidden flex gap-4 pb-2">
                {actors.map((actor) => {
                    return <ActorItem key={actor.id} actor={actor} />;
                })}
            </div>
        </>
    );
};

export default Actors;

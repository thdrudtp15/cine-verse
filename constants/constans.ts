export const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
export const OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
};

import { Database } from './supabase';

export type Movies = Database['public']['Tables']['movies']['Row'];
export type InteractionsProviders = Database['public']['Tables']['interactions_providers']['Row'];
export type InteractionsWishes = Database['public']['Tables']['interactions_wishes']['Row'];
export type InteractionsVisits = Database['public']['Tables']['interactions_visits']['Row'];
export type InteractionsVideos = Database['public']['Tables']['interactions_videos']['Row'];
export type RecommendationsHistory = Database['public']['Tables']['recommendations_history']['Row'];
export type RecommendationsMovieList = Database['public']['Tables']['recommendations_movie_list']['Row'];

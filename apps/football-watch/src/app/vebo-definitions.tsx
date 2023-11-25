export interface MatchStreamNetwork {
    status: number;
    data: MatchStream;
}

export interface MatchStream {
    has_lineup: boolean;
    has_tracker: boolean;
    commentators: Commentator[];
    play_urls: Stream[];
    id: string;
};

export interface Stream {
    name: string;
    cdn: string;
    url: string;
    role: string;
}

export interface MatchStatus {
    key_sync: string;
    name: string;
    slug: string;
    date: string;
    timestamp: number;
    home_red_cards: number;
    away_red_cards: number;
    home: Team;
    away: Team;
    tournament: Tournament;
    scores: Scores;
    win_code: number;
    match_status: 'finished' | 'delay' | 'canceled' | 'live' | 'pending';
    sport_type: string;
    has_lineup: boolean;
    has_tracker: boolean;
    is_featured: boolean;
    thumbnail_url: string | null;
    commentators: Commentator[] | null;
    is_live: boolean;
    id: string;

    // // Sample data - I believe this is for the real-time animation from "Sofascore"
    //  "room_id": "dn1m1ghp62o6moe",
    // "live_tracker": "https://widget.vebo.dev/live-tracker/dn1m1ghp62o6moe"
    room_id: string;
    live_tracker: string;
}

export interface Team {
    name: string;
    short_name: string;
    gender: string | null;
    name_code: string | null;
    slug: string;
    logo: string;
    id: string;
}

export interface Tournament {
    name: string;
    logo: string;
    priority: number;
    unique_tournament: {
        name: string;
        slug: string;
        logo: string;
        is_featured: boolean;
        priority: number;
        id: string;
    };
}

export interface Scores {
    home: number;
    away: number;
    detail: string | null;
    sport_type: string;
}

export interface Commentator {
    id: string;
    name: string;
    avatar: string;
    url: string;
}

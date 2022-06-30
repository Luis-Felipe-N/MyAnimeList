export interface IAnime {
    title: string;
    id: string;
    description: string;
    image: {
        url: string;
        name: string;
    };
    status: 'toWatch' | 'watching' | 'watched';
}

export interface IAnimes {
    toWatch: IAnime[];
    watching: IAnime[];
    watched: IAnime[];
}
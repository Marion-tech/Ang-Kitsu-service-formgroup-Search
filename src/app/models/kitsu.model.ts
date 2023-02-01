import { Observable } from 'rxjs';

export interface IKitsuData {
  data: IAnime[];
  links: {
    first: string;
    next: string;
    last: string;
  };
}
export interface IKitsuDataById {
  data: IAnime;
}
export interface IAnime {
  id: string;
  type: string;
  genres$: Observable<IGenre[]>;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    synopsis: string;
    description: string;
    titles: {
      en: string;
      en_jp: string;
      en_us: string;
      ja_jp: string;
    };
    canonicalTitle: string;
    abbreviatedTitles: string[];
    startDate: Date;
    endDate: Date;
    status: string;
    posterImage: IImage;
    coverImage: IImage;
    episodeCount: number;
    episodeLength: number;
    totalLength: number;
  };
  relationships: {
    genres: {
      links: {
        self: string;
        related: string;
      };
    };
  };
}

export interface IImage {
  tiny: string;
  large: string;
  small: string;
  medium: string;
  original: string;
}

export interface IKitsuGenre {
  data: IGenre[];
}

export interface IGenre {
  id: number;
  type: string;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description: string;
  };
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { IAnime, IGenre, IKitsuData, IKitsuGenre } from '../models/kitsu.model';

@Injectable({
  providedIn: 'root',
})
export class KitsuService {
  constructor(private httpClient: HttpClient) {}

  public getAnimeByFilt(keyword: string): Observable<IAnime[]> {
    if (keyword !== '' && !!keyword) {
      // !!keyword veut dire (keyword !== null && keyword !== undefined)
      return this.httpClient
        .get<IKitsuData>(this.generateURL(keyword))
        .pipe(map((anime: IKitsuData) => anime.data));
    } else {
      return this.httpClient
        .get<IKitsuData>('https://kitsu.io/api/edge/anime')
        .pipe(map((anime: IKitsuData) => anime.data));
    }
  }

  public getGenres(): Observable<IGenre[]> {
    return this.httpClient
      .get<IKitsuGenre>(
        'https://kitsu.io/api/edge/genres?page%5Blimit%5D=80&page%5Boffset%5D=0'
      )
      .pipe(map((data: IKitsuGenre) => data.data))
      .pipe(take(1));
  }

  public getGenreByName(genre: string, keyword: string): Observable<IAnime[]> {
    return this.httpClient
      .get<IKitsuData>(this.generateURL(genre, keyword))
      .pipe(
        map(
          (genre: IKitsuData) => genre.data
          //.filter((filt:IGenre)=> filt.attributes.name === genre))
        )
      );
  }

  private generateURL(genre?: string, keyword?: string): string {
    let url = 'https://kitsu.io/api/edge/anime';
    let first = true;
    if (genre) {
      url = url + (first ? '?' : '&') + 'filter[categories]=' + genre;
      first = false;
    }
    if (keyword) {
      url = url + (first ? '?' : '&') + 'filter%5Btext%5D=' + keyword;
      first = false;
    }

    return url;
  }
}

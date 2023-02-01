import { Component } from '@angular/core';
import { formControl } from '@angular/core/schematics/migrations/typed-forms/util';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, of, startWith, switchMap, take } from 'rxjs';
import { IAnime, IGenre } from './models/kitsu.model';
import { KitsuService } from './services/kitsu.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public anime$: Observable<IAnime[]>;
  public genre$: Observable<IGenre[]>;

  public formGroup = new FormGroup({
    search: new FormControl(),
    genre: new FormControl(),
  });

  constructor(private kitsuService: KitsuService) {

    this.kitsuService
    .getGenres()
    .pipe(take(1))
    .subscribe((val) => console.log('getGenre', val));


    this.genre$ = this.kitsuService.getGenres();
    this.formGroup.valueChanges.subscribe((value)=> console.log(value));


    this.anime$ = this.formGroup.valueChanges.pipe(
      switchMap((value: { genre: string, search : string }) => {

        //this.formGroup.setValue({search:'', genre: value.genre});
        console.log('genre', value);
        return this.kitsuService.getGenreByName(value.genre, value.search);
      })
    );

    

  

    //this.formGroup.valueChanges.subscribe((value)=> console.log(value));
    //this.anime$ = this.kitsuService.getAnimeByFilt('');

    // this.anime$ = this.formGroup.valueChanges.pipe(
    //   startWith(this.formGroup.getRawValue()),
    //   switchMap((value: { search: string }) => {
    //     console.log(value.search)
    //     return this.kitsuService.getAnimeByFilt(value.search);
    //   })
    // );
  }
}

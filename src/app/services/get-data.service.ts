import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private _HttpClient:HttpClient) {
   }

   getAll(pageNumber: any):Observable<any>{
    return this._HttpClient.get("https://api.themoviedb.org/3/trending/all/day?api_key=6e16fd75e0f215be735393b1809bcb5c&page="+pageNumber)
   }

   getMovies(pageNumber: any):Observable<any>{
    return this._HttpClient.get("https://api.themoviedb.org/3/trending/movie/day?api_key=6e16fd75e0f215be735393b1809bcb5c&page="+pageNumber)
   }

   getSeries(pageNumber: any):Observable<any>{
    return this._HttpClient.get("https://api.themoviedb.org/3/trending/tv/day?api_key=6e16fd75e0f215be735393b1809bcb5c&page="+pageNumber)
   }

   getActors(pageNumber: any):Observable<any>{
    return this._HttpClient.get("https://api.themoviedb.org/3/trending/person/day?api_key=6e16fd75e0f215be735393b1809bcb5c&page="+pageNumber)
   }

   getMovieById(id:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6e16fd75e0f215be735393b1809bcb5c&language=en-US`)
   }

   getSeriesById(id: any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=6e16fd75e0f215be735393b1809bcb5c&language=en-US`)
   }

   getActorById(id:any){
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}?api_key=6e16fd75e0f215be735393b1809bcb5c&language=en-US`)
   }

   getTheTrailer(name:string):Observable<any>{
    return this._HttpClient.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwpmIWr4287QK7VlK7_LetuyX4B46RWOk&type=video&part=snippet&maxResults=1&q=${name}+trailer`)
   }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment.prod';
import { $ } from 'protractor';

const apiKey = environment.apiKey;
// const apiUrl = environment.apiUrl;
// const headers = new HttpHeaders({
// 'X-Api-key': apiKey
// })

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  // private ejecutarQuery<T>( query:string ){
  //   query = apiUrl + query;
  //   return this.http.get<T>(query, { headers });
  // }

  getTopHeadlines(){
    this.headlinesPage++;
  //  return this.ejecutarQuery<RespuestaTopHeadlines>(`top-headlines?country=us`);
     return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&page=${this.headlinesPage}&apiKey=da8cc1f8417a45f5bb70efc81dc5dc09`);
  }

  getTopHeadlinesCategorias( categoria : string){
    if( this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }


    return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}&apiKey=da8cc1f8417a45f5bb70efc81dc5dc09`)

  }

}

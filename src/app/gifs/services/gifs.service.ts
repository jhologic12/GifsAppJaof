
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //ruta de api
  private apiKey : string = 'S7doGFqPksnoMuksRNcU1MQQ8FlhtD9G';
  private servicioUrl :string = 'https://api.giphy.com/v1/gifs';
 private _historial: string[]=[];

 public resultados : Gif[] = [];

 get historial(){
  return [...this._historial];
 }

 
 constructor( private http: HttpClient){
  
    this._historial = JSON.parse(localStorage.getItem('historial')!)||[];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];
  
 }
 
 buscarGifs(criterio: string){

  criterio = criterio.trim().toLocaleLowerCase();

  if( !this._historial.includes(criterio) ){
    this._historial.unshift(criterio);
    this._historial= this._historial.splice(0,10);

    //almacenar en localstorage del navegador web
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }
  

  const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',criterio);



this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp  ) =>{
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados' , JSON.stringify(this.resultados));
      });

  
 }
}

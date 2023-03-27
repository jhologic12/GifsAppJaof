
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //ruta de api
  private apiKey : string = 'S7doGFqPksnoMuksRNcU1MQQ8FlhtD9G';
 private _historial: string[]=[];

 public resultados : any[] = [];

 get historial(){
  return [...this._historial];
 }

 
 constructor( private http: HttpClient){}
 
 buscarGifs(criterio: string){

  criterio = criterio.trim().toLocaleLowerCase();

  if( !this._historial.includes(criterio) ){
    this._historial.unshift(criterio);
    this._historial= this._historial.splice(0,10);
  }
  

this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=S7doGFqPksnoMuksRNcU1MQQ8FlhtD9G&q=${criterio}&limit=10`)
      .subscribe((resp : any ) =>{
        console.log(resp.data);
        this.resultados = resp.data;
      });

  
 }
}

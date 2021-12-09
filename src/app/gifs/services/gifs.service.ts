import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public resultados: Gif[] = []; //  Gif viene de la interfaz 
  private _historial: String[] = [];
  private apiKey: string = 'vukjrIW3blc49jPIQrrWwH0AEbhiKVHB';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {

    // inicialización de variables 
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial'));
    }
    this.resultados = JSON.parse(localStorage.getItem('resultados')) || [];
  }

  // obtener historial 
  get Historial() {
    return [...this._historial];
  }

  // agg info
  buscarGifs(query: String = '') {

    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) { // no repetidos 
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10); // limitar historial de busqueda 

      localStorage.setItem('historial', JSON.stringify(this._historial)); // almacenamiento 
    }

    // construcción query params
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query.toString());

    console.log(params.toString());
    // tipado proveniente de la petición : brinda mayor información de la respuesta
    this.http.get<SearchGifResponse>(`${this.servicioUrl}/search?${params}`).subscribe((resp: any) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })

    // console.log(this._historial);
  }

}

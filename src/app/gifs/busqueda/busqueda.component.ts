import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  // inyectar servicio 
  constructor(private gifsService: GifsService) { }

  // input element - #txtBuscar - type :HTMLInputElement
  @ViewChild('txtBuscar') txtBusar: ElementRef<HTMLInputElement>;

  buscar() {
    // console.log(this.txtBusar.nativeElement.value)
    const valor: String = this.txtBusar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);
    this.txtBusar.nativeElement.value = ""
  }

}

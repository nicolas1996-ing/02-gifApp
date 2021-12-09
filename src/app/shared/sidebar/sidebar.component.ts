import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifService: GifsService) { }

  // 'historial' almacena arreglo 
  get historial() {
    return this.gifService.Historial;
  }

  buscar(gifABuscar: string) {
    this.gifService.buscarGifs(gifABuscar);
    console.log(typeof ('k'));
  }

}

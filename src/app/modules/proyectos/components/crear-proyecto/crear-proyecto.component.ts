import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  polylinePath: google.maps.LatLng[] = [];
  resetMapSignal: boolean = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  triggerReset() {
    this.resetMapSignal = true;
    setTimeout(() => this.resetMapSignal = false, 0);
  }

  handlePathCreated(path: google.maps.LatLng[]): void {
    this.polylinePath = path;
    console.log("🚀 ~ file: crear-proyecto.component.ts:18 ~ CrearProyectoComponent ~ handlePathCreated ~ path:", path.toString().length)
  }

}

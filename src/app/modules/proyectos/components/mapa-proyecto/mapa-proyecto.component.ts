import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { GoogleMapsLoaderService } from '../../services/googleMapsLoader.service';

@Component({
  selector: 'app-mapa-proyecto',
  templateUrl: './mapa-proyecto.component.html',
  styleUrls: ['./mapa-proyecto.component.css']
})
export class MapaProyectoComponent implements OnInit {

  @Output() pathCreated = new EventEmitter<any[]>();
  @Input() resetSignal: boolean = false;

  private poly: google.maps.Polyline = {} as google.maps.Polyline;
  private map: google.maps.Map = {} as google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private readonly defaultCenter = { lat: 4.60971, lng: -74.08175 };
  private readonly defaultZoom = 11;

  constructor(private googleMapsLoader: GoogleMapsLoaderService) { }

  ngOnInit() {
    this.googleMapsLoader.loader.load().then(() => {
      this.initializeMap();
      this.initializeAutocomplete();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetSignal && changes.resetSignal.currentValue === true) {
      this.resetMap();
    }
  }

  private initializeMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: this.defaultZoom,
      center: this.defaultCenter,
      mapTypeId: "terrain",
      streetViewControl: false,
      styles: [
        {
          featureType: "poi", // Desactiva los lugares (Points of Interest)
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit", // Desactiva las opciones de tránsito
          stylers: [{ visibility: "off" }]
        }
      ],
    });

    this.poly = new google.maps.Polyline({
      strokeColor: "#FEEE04",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    this.poly.setMap(this.map);
    this.map.addListener("click", this.addLatLngToPoly.bind(this));
  }

  private addLatLngToPoly(event: any): void {
    const path = this.poly.getPath();
    path.push(event.latLng);

    const marker = new google.maps.Marker({
      position: event.latLng,
      title: `#${path.getLength()}`,
      map: this.map,
      icon: 'assets/img/marker.png',
    });

    this.markers.push(marker);
    this.savePolyline();
  }

  removeLastPoint(): void {
    if (this.poly.getPath().getLength() > 0) {
      this.poly.getPath().pop();
      this.removeMarker(this.markers.pop());
      this.savePolyline();
    }
  }

  private removeMarker(marker: google.maps.Marker | undefined): void {
    if (marker) {
      marker.setMap(null);
    }
  }

  private initializeAutocomplete(): void {
    const input = document.getElementById("place-search") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", this.handlePlaceChange.bind(this, autocomplete));
  }

  private handlePlaceChange(autocomplete: google.maps.places.Autocomplete): void {
    const place: any = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      window.alert(`No se encontró el lugar: '${place.name}'`);
      return;
    }
    this.map.setCenter(place.geometry.location);
    this.map.setZoom(12);
  }

  private savePolyline(): void {
    const path = this.poly.getPath().getArray();
    const formattedPath = path.map((latLng) => {
      return { lat: latLng.lat(), lng: latLng.lng() };
    });
    this.pathCreated.emit(formattedPath);
  }

  resetMap(): void {
    const input = document.getElementById("place-search") as HTMLInputElement;
    input.value = "";
    this.markers.forEach(this.removeMarker);
    this.markers = [];
    this.resetPolyline();
    this.resetMapView();
  }

  private resetPolyline(): void {
    this.poly.setMap(null);
    this.poly = new google.maps.Polyline({
      strokeColor: "#FEEE04",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    this.poly.setMap(this.map);
  }

  private resetMapView(): void {
    this.map.setCenter(this.defaultCenter);
    this.map.setZoom(this.defaultZoom);
  }
}

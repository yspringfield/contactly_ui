import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster';

// Import images directly that got missed via the CSS imports above.
// import 'leaflet/dist/images/marker-icon-2x.png';
// import 'leaflet/dist/images/marker-shadow.png';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input('id')
  id: string;

  @ViewChild('map', { static: true })
  map: any;

  markersData = [
    {
      "name": "Goroka",
      "city": "Goroka, Papua New Guinea",
      "ip": "192.168.00.34",
      "browser": "Chrome",
      "lat": -6.081689,
      "lng": 145.391881,
      "alt": 5282,
      "tz": "Pacific/Port_Moresby"
    }, {
      "name": "Madang",
      "city": "Madang, Papua New Guinea",
      "ip": "192.168.00.34",
      "browser": "Curl",
      "lat": -5.207083,
      "lng": 145.7887,
      "alt": 20,
      "tz": "Pacific/Port_Moresby"
    }, {
    }, {
      "name": "San Diego Old Town Transit Center",
      "city": "San Diego, United States",
      "ip": "192.168.00.34",
      "lat": 32.7552,
      "lng": -117.1995,
      "alt": 0,
      "tz": "America/Los_Angeles"
    }
  ]

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    var mymap = L.map(this.map.nativeElement).setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11'
    }).addTo(mymap);

    var markers = L.markerClusterGroup();
    this.markersData.forEach(markerDatum => {
      let marker = L.marker([51.5, -0.09])
        .bindPopup(markerDatum.name +
          '<br/>' + markerDatum.city +
          '<br/><b>ip:</b> ' + markerDatum.ip +
          '<br/><b>Browser:</b> ' + markerDatum.browser +
          '<br/><b>Version:</b> ' + Math.round(markerDatum.alt * 0.3048) +
          '<br/><b>Timezone:</b> ' + markerDatum.tz);
      markers.addLayer(marker);
    })
    mymap.addLayer(markers);

    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }

    mymap.on('click', onMapClick);
  }
}

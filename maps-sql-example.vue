<template>
	<div id="loc-map"></div>
</template>

<script>
import EventBus from '../../js/event-bus.js';
export default {
	name: "Map",
	components: {},
	props: {
		appCache: Object,
		appt: Object,
	},
	data() {
		return {}
	},
	computed: {},
	methods: {
		getMarkerIcon(loc) {
			let isActive =	loc.TimeTradeId === this.appt.googleMaps.active;
			let icon1 = 	isActive ?
							'/content/images/marker-sql-active.png' :
							'/content/images/marker-sql.png';
			let icon2 = 	isActive ?
							'/content/images/marker-covid19-active.png' :
							'/content/images/marker-covid19.png';
			return loc.NonSqlLocation ? icon2 : icon1;
		},
		addMarker(loc) {
			let pos = {
					lat: loc.Latitude,
					lng: loc.Longitude,
				}
			const mapMarker = new google.maps.Marker({
				map: this.appt.googleMaps.locMap,
				icon: this.getMarkerIcon(loc),
				position: pos,
				title: loc.Name,
			});
			mapMarker.set("TimeTradeId", loc.TimeTradeId);
			mapMarker.addListener("click", () => {
				console.log(loc.Name + ' CLICKED!');
			});
			this.appt.googleMaps.markers.push(mapMarker);
		},
		delMarker(loc) {
			this.appt.googleMaps.markers.forEach(marker => {
				if (
					marker.TimeTradeId === loc.TimeTradeId
				) marker.setMap(null);
			});
		},
		delAllMarkers() {
			this.appt.googleMaps.markers.forEach(marker => {
				marker.setMap(null);
			});
		},
		loadMapMarkers() {
			this.delAllMarkers();
			let bounds = new google.maps.LatLngBounds();
			this.appt.locationsShown.forEach(loc => {
				if (loc.Latitude && loc.Longitude) {
					let pos = {
							lat: loc.Latitude,
							lng: loc.Longitude,
						}
					bounds.extend(pos);
					this.addMarker(loc)
				};
				this.appt.googleMaps.locMap.fitBounds(bounds);
			});
		},
		initMap() {
			let mapEl = document.getElementById('loc-map');
			let styles = {
					center: this.appt.googleMaps.mapCenter,
					maxZoom: 16,
					minZoom: 7,
					scrollwheel: false,
					zoom: 10,
					zoomControlOptions: {
						position: google.maps.ControlPosition.TOP_LEFT,
					},
					fullscreenControl: false,
					streetViewControl: false,
					mapTypeId: 'roadmap',
					mapTypeControl: false,
				};
			this.appt.googleMaps.locMap = new google.maps.Map(mapEl, styles);
		},
		getDistance(loc1, loc2) {
			let decameterToMiles = 0.000621371192;
			let gmloc1 = new google.maps.LatLng(loc1.lat, loc1.lng);
			let gmloc2 = new google.maps.LatLng(loc2.lat, loc2.lng);
			let distance = google.maps.geometry.spherical.computeDistanceBetween(gmloc1, gmloc2);
			return (distance * decameterToMiles).toFixed(2);
		},
	},
	created() {
		EventBus.$on('gmLoadMapMarkers', () => {
			this.loadMapMarkers();
		});
		EventBus.$on('gmAddMarker', (loc) => {
			this.addMarker(loc);
		});
		EventBus.$on('gmDelMarker', (loc) => {
			this.delMarker(loc);
		});
		EventBus.$on('gmDelAllMarkers', () => {
			this.delAllMarkers();
		});
	},
	mounted() {
		this.initMap();
	}
};
</script>
<template>
  <div class="location-map">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
export default {
  name: "LocationMap",
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  data() {
      return {
          map: null
      }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: this.location.lat, lng: this.location.lng }
    });
    //   var geocoder = new google.maps.Geocoder();
    //   var infowindow = new google.maps.InfoWindow();

    //   document.getElementById("submit").addEventListener("click", function() {
    //     geocodeLatLng(geocoder, map, infowindow);
    //   });
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
    this.geocodeLatLng(geocoder, this.map, infowindow);
  },
  watch: {
    location() {
      var geocoder = new google.maps.Geocoder();
      var infowindow = new google.maps.InfoWindow();
      this.geocodeLatLng(geocoder, this.map, infowindow);
    }
  },
  methods: {
    geocodeLatLng(geocoder, map, infowindow) {
      var latlng = {
        lat: this.location.lat,
        lng: this.location.lng
      };
      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === "OK") {
          if (results[0]) {
            map.setZoom(15);
            var marker = new google.maps.Marker({
              position: latlng,
              map: map
            });
            infowindow.setContent(results[0].formatted_address);
            // infowindow.open(map, marker);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  min-height: 200px;
  width: 100%;
}
</style>

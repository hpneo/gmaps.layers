# gmaps.layers

gmaps.js module to add dynamic layers.

## Install

For using with bundlers (as Browserify or Webpack):

`npm install gmaps.layers --save`

Before `require()` this module you need to `require('gmaps.core')`.

For using directly in the browser, download the `gmaps.layers.js` (or `gmaps.layers.min.js`) in `dist`.

## Usage

You need to register a `<script>` tag with the Google Maps JavaScript API, then import gmaps.core.

Every Google Maps map needs a container (`<div id="map"></div>` in this demo), which needs to have width and height, and be visible (without `display: none`, for example):

```
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="gmaps.core.js"></script>
  <script src="gmaps.layers.js"></script>
  <style type="text/css">
    #map {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = new GMaps({
      el : '#map',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });

    map.addLayer('traffic');
  </script>
</body>
</html>
```

For more examples you can check the tests in this repo.

## Documentation

### `getFromFusionTables(options)`

Create and returns a `google.maps.FusionTablesLayer` object, but doesn't add it to the map. Accepts all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#FusionTablesLayerOptions).

Also, accepts an `events` property inside `options`, which contains callbacks for the following events in the layer:

* `click`

### `loadFromFusionTables(options)`

Create a `google.maps.FusionTablesLayer` object, add the layer to the map and returns it. Accepts all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#FusionTablesLayerOptions).

Also, accepts an `events` property inside `options`, which contains callbacks for the following events in the layer:

* `click`

### `getFromKML(options)`

Create and returns a `google.maps.KmlLayer` object, but doesn't add it to the map. Accepts all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#KmlLayerOptions).

Also, accepts an `events` property inside `options`, which contains callbacks for the following events in the layer:

* `click`
* `defaultviewport_changed`
* `status_changed`

### `loadFromKML(options)`

Create a `google.maps.KmlLayer` object, add the layer to the map and returns it. Accepts all the options from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference#KmlLayerOptions).

Also, accepts an `events` property inside `options`, which contains callbacks for the following events in the layer:

* `click`
* `defaultviewport_changed`
* `status_changed`

### `addLayer(layerName, options)`

Add a _data_ layer to the map, which can be:

* `weather`
* `clouds`
* `traffic`
* `transit`
* `bicycling`
* `panoramio`
* `places`

#### Notes:

* Both `weather` and `panoramio` accepts all the options from the Google Maps JavaScript API: [WeatherLayerOptions](https://developers.google.com/maps/documentation/javascript/reference#WeatherLayerOptions) and [PanoramioLayerOptions](https://developers.google.com/maps/documentation/javascript/reference#PanoramioLayerOptions).
* The `panoramio` layer accepts a `filter` property and a `click` callback inside `options`.
* The `places` layer accepts four callbacks: `searchCallback`, `nearbySearchCallback`, `radarSearchCallback` and `textSearchCallback`. Also accepts all the options from [PlaceSearchRequest](https://developers.google.com/maps/documentation/javascript/reference#PlaceSearchRequest), [RadarSearchRequest](https://developers.google.com/maps/documentation/javascript/reference#RadarSearchRequest) and [TextSearchRequest](https://developers.google.com/maps/documentation/javascript/reference#TextSearchRequest).
* `searchCallback` is an alias for `nearbySearchCallback`.

### `removeLayer(layer)`

Remove a layer from the map and the `layers` or `singleLayers` properties, according the layer type. The `layer` parameter must be a layer created with `addLayer()`, `loadFromFusionTables()`, `loadFromKML()`, or one of the elements inside the `layers` or `singleLayers` properties.

### `removeLayers()`

Remove all the layers from the map and clear the `layers` and `singleLayers` properties.

---

### Events

The following methods triggers custom events. You need to add the `gmaps.events` module before using this module to work with those events:

| Method | Event |
| ------ | ----- |
| `loadFromFusionTables` | `fusion_tables_layer_added` |
| `loadFromKML` | `kml_layer_added` |
| `addLayer` | `layer_added` |
| `removeLayer` | `layer_removed` |

## Changelog

For pre 0.5.0 versions, check [gmaps.js changelog](https://github.com/hpneo/gmaps#changelog)

### 0.5.0

* Node module format (CommonJS)

## License

MIT License. Copyright 2015 Gustavo Leon. http://github.com/hpneo

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
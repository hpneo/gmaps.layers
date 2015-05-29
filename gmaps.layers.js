'use strict';

var _forEach = require('lodash-compat/collection/forEach'),
    _forIn = require('lodash-compat/object/forIn'),
    _extend = require('lodash-compat/object/extend'),
    _omit = require('lodash-compat/object/omit'),
    layersModule = {};

layersModule.getFromFusionTables = function(options) {
  var events = options.events;

  delete options.events;

  var fusionTablesOptions = options,
      layer = new google.maps.FusionTablesLayer(fusionTablesOptions);

  _forIn(events, function(eventCallback, eventName) {
    google.maps.event.addListener(layer, eventName, eventCallback);
  });

  this.layers.push(layer);

  return layer;
};

layersModule.loadFromFusionTables = function(options) {
  var layer = this.getFromFusionTables(options);
  layer.setMap(this.map);

  if (GMaps.trigger) {
    GMaps.trigger('fusion_tables_layer_added', this, layer);
  }

  return layer;
};

layersModule.getFromKML = function(options) {
  var url = options.url,
      events = options.events;

  delete options.url;
  delete options.events;

  var kmlOptions = options,
      layer = new google.maps.KmlLayer(url, kmlOptions);

  _forIn(events, function(eventCallback, eventName) {
    google.maps.event.addListener(layer, eventName, eventCallback);
  });

  this.layers.push(layer);

  return layer;
};

layersModule.loadFromKML = function(options) {
  var layer = this.getFromKML(options);
  layer.setMap(this.map);

  if (GMaps.trigger) {
    GMaps.trigger('kml_layer_added', this, layer);
  }

  return layer;
};

layersModule.addLayer = function(layerName, options) {
  //var default_layers = ['weather', 'clouds', 'traffic', 'transit', 'bicycling', 'panoramio', 'places'];
  options = options || {};

  var optionsToDelete = ['filter', 'click', 'search', 'nearbySearch', 'radarSearch', 'textSearch'],
      layer,
      filter = options.filter,
      clickCallback = options.click,
      searchCallback = options.search,
      nearbySearchCallback = options.nearbySearch,
      radarSearchCallback = options.radarSearch,
      textSearchCallback = options.textSearch;

  options = _omit(options, optionsToDelete);

  switch (layerName) {
    case 'weather':
      layer = this.singleLayers.weather = new google.maps.weather.WeatherLayer(options);
      break;
    case 'clouds':
      layer = this.singleLayers.clouds = new google.maps.weather.CloudLayer();
      break;
    case 'traffic':
      layer = this.singleLayers.traffic = new google.maps.TrafficLayer();
      break;
    case 'transit':
      layer = this.singleLayers.transit = new google.maps.TransitLayer();
      break;
    case 'bicycling':
      layer = this.singleLayers.bicycling = new google.maps.BicyclingLayer();
      break;
    case 'panoramio':
      layer = this.singleLayers.panoramio = new google.maps.panoramio.PanoramioLayer(options);
      layer.setTag(filter);

      if (typeof clickCallback === 'function') {
        google.maps.event.addListener(layer, 'click', clickCallback);
      }

      break;
    case 'places':
      layer = this.singleLayers.places = new google.maps.places.PlacesService(this.map);

      //search, nearbySearch, radarSearch callback, Both are the same
      if (searchCallback || nearbySearchCallback || radarSearchCallback) {
        var placeSearchRequest  = {
          bounds: options.bounds || null,
          keyword: options.keyword || null,
          location: options.location || null,
          name: options.name || null,
          radius: options.radius || null,
          rankBy: options.rankBy || null,
          types: options.types || null
        };

        if (typeof searchCallback === 'function') {
          layer.search(placeSearchRequest, searchCallback);
        }

        if (typeof nearbySearchCallback === 'function') {
          layer.nearbySearch(placeSearchRequest, nearbySearchCallback);
        }

        if (typeof radarSearchCallback === 'function') {
          layer.radarSearch(placeSearchRequest, radarSearchCallback);
        }
      }

      //textSearch callback
      if (typeof textSearchCallback === 'function') {
        var textSearchRequest  = {
          bounds: options.bounds || null,
          location: options.location || null,
          query: options.query || null,
          radius: options.radius || null
        };

        layer.textSearch(textSearchRequest, textSearchCallback);
      }

      break;
  }

  if (layer !== undefined) {
    if (typeof layer.setOptions === 'function') {
      layer.setOptions(options);
    }

    if (typeof layer.setMap === 'function') {
      layer.setMap(this.map);
    }

    if (GMaps.trigger) {
      GMaps.trigger('layer_added', this, layer);
    }

    return layer;
  }
};

layersModule.removeLayer = function(layer) {
  var singleLayerInMap = this.singleLayers[layer];

  if (typeof layer === 'string' && singleLayerInMap !== undefined) {
    singleLayerInMap.setMap(null);

    if (GMaps.trigger) {
      GMaps.trigger('layer_removed', this, singleLayerInMap);
    }

    delete this.singleLayers[layer];
  }
  else {
    for (var i = 0; i < this.layers.length; i++) {
      var layerInMap = this.layers[i];

      if (layerInMap === layer) {
        layerInMap.setMap(null);
        this.layers.splice(i, 1);

        if (GMaps.trigger) {
          GMaps.trigger('layer_removed', this, layer);
        }

        break;
      }
    }
  }
};

layersModule.removeLayers = function() {
  _forIn(this.singleLayers, function(layer) {
    layer.setMap(null);
  });

  _forEach(this.layers, function(layer) {
    layer.setMap(null);
  });

  this.singleLayers = {};
  this.layers.length = 0;
};

if (window.GMaps) {
  GMaps.customEvents = GMaps.customEvents || [];
  GMaps.customEvents = GMaps.customEvents.concat([
    'fusion_tables_layer_added', 'kml_layer_added',
    'layer_added', 'layer_removed'
  ]);

  _extend(GMaps.prototype, layersModule);
}

module.exports = layersModule;
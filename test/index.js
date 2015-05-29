describe("Adding layers", function() {
  var mapWithLayers, singleLayer, multipleLayers = [];

  beforeEach(function() {
    mapWithLayers = mapWithLayers || new GMaps({
      el : '#layers',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });
  });

  describe("Single layer", function() {
    beforeEach(function() {
      singleLayer = singleLayer || mapWithLayers.addLayer('traffic');
    })

    it("should be added in the current map", function() {
      expect(singleLayer.getMap()).toEqual(mapWithLayers.map);
    });

    it("should be removed from the current map", function() {
      mapWithLayers.removeLayer('traffic');
      
      expect(singleLayer.getMap()).toNotExist();
    });
  });

  describe("Multiple layers", function() {
    beforeEach(function() {
      if (multipleLayers.length === 0) {
        multipleLayers.push(mapWithLayers.addLayer('transit'));
        multipleLayers.push(mapWithLayers.addLayer('bicycling'));
      }
    });

    it("should be added in the current map", function() {
      expect(multipleLayers[0].getMap()).toEqual(mapWithLayers.map);
      expect(multipleLayers[1].getMap()).toEqual(mapWithLayers.map);
    });
    
    it("should be removed from the current map", function() {
      mapWithLayers.removeLayer('transit');
      mapWithLayers.removeLayer('bicycling');

      expect(multipleLayers[0].getMap()).toNotExist();
      expect(multipleLayers[1].getMap()).toNotExist();
    });
  });
});
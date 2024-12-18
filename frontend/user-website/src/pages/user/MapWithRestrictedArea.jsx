import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';

const MapWithRestrictedArea = ({ onConfirm }) => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const bottomLeft = fromLonLat([124.65448369078607, 8.484757587809328]);
    const topRight = fromLonLat([124.6587442680971, 8.487072471046389]);
    const boundingExtent = [bottomLeft[0], bottomLeft[1], topRight[0], topRight[1]];

    const center = [
      (bottomLeft[0] + topRight[0]) / 2,
      (bottomLeft[1] + topRight[1]) / 2,
    ];

    const vectorSource = new VectorSource();

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center,
        zoom: 17,
        maxZoom: 19,
        extent: boundingExtent,
      }),
      controls: defaultControls({ zoom: true, attribution: false }),
    });

    map.on('click', (event) => {
      const coords = toLonLat(event.coordinate); 
      setCoordinates(coords);
      const markerFeature = new Feature(new Point(event.coordinate));

      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.07,
          }),
        })
      );

      vectorSource.clear();
      vectorSource.addFeature(markerFeature);
    });

    return () => map.setTarget(null);
  }, []);

  // Handle "Confirm" button click
  const handleConfirm = () => {
    if (coordinates) {
      onConfirm(coordinates); // Send coordinates to parent
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default MapWithRestrictedArea;

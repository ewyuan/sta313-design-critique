import React from 'react'
import {useState, useEffect, useMemo, useCallback} from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl'
import ControlPanel from './control-panel'
import {dataLayer} from './map-style.js';
import "./App.css"
import {updatePercentiles} from './utils'

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

function App() {
  const [viewport, setViewport] = React.useState({
    latitude: 60,
    longitude: -98,
    zoom: 3
  });

  const [year, setYear] = useState(2001)
  const [allData, setAllData] = useState(null)
  const [hoverInfo, setHoverInfo] = useState(null)

  useEffect(() => {
    /* global fetch */
    console.log(TOKEN)
    fetch(
      'https://raw.githubusercontent.com/ewyuan/sta313-design-critique/master/src/data/unemployment-data.geojson'
    )
      .then(resp => resp.json())
      .then(json => setAllData(json));
  }, []);

  const onHover = useCallback(event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY
          }
        : null
    );
  }, []);

  const data = useMemo(() => {
    return allData && updatePercentiles(allData, f => f.properties.unemploymentRates[year]);
  }, [allData, year]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        width="100wh"
        height="100vh"
        interactiveLayerIds={['data']}
        onHover={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            <div>Province/Territory: {hoverInfo.feature.properties.name}</div>
            <div>Unemployment Rate: {hoverInfo.feature.properties.value}%</div>
            <div>Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}</div>
          </div>
        )}
      </ReactMapGL>
      <ControlPanel 
        year={year}
        onChange={value => setYear(value)} 
      />
    </div>
  )
}

export default App;

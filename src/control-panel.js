import * as React from 'react';

function ControlPanel(props) {
  const {year} = props;

  return (
    <div className="control-panel">
      <h3>Visualizing Unemployment Rates in Canada</h3>
      <p>
        Map showing unemployment rates by province/territory in year <b>{year}</b>. 
      </p>
      <p>
        Hover over a province/territory to
        see unemployment rates, and percentile for that year.
      </p>
      <p>
        Data source: <a href="https://www.statcan.gc.ca">Statistics Canada</a>
      </p>
      <hr />

      <div key={'year'} className="input">
        <label>Year</label>
        <input
          type="range"
          value={year}
          min={2004}
          max={2020}
          step={1}
          onChange={evt => props.onChange(evt.target.value)}
        />
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);

import React from 'react';
import { useSelector } from 'react-redux';
import { getNoOfGems } from '../redux-store/resultsSlice';
import gem from '../img/gem.svg';

const Gems = () => {
  const gemsNo = useSelector(getNoOfGems);
  const gemStyle = { padding: '10px', width: '55px' };
  const styleRowMargin = { marginLeft: 0, marginRight: 0 };
  const styleColPadding = { paddingLeft: '5px', paddingRight: '5px' };

  return (
    <div className="row" style={styleRowMargin}>
      <div className="col-md-3 col-sm-2" />
      <div className="col-md-6 col-sm-8" align="center" style={styleColPadding}>
        {Array(gemsNo).fill(1).map((value, index) => (
          <img
            src={gem}
            alt="gem"
            key={`gem.${String(index)}`}

            style={gemStyle}
          />
        ))}
      </div>
      <div className="col-md-3 col-sm-2" />
    </div>
  );
};

export default Gems;

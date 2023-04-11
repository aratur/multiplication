import React from 'react';
import Equation from './Equation/Equation';

import SelectAnswer from './SelectAnswer/SelectAnswer';
import HappySad from './HappySad/HappySad';
import Gems from './Gems/Gems';

const Questions = () => (
  <>
    <Gems />
    <Equation />
    <SelectAnswer />
    <HappySad />
  </>
);

export default Questions;

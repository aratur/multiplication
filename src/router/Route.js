/* eslint "react/require-default-props": 0 */
/* eslint "react/no-unused-prop-types": 0 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import invariant from 'invariant';

class Route extends Component {
  render() {
    return invariant(false, "<Route> elements are for config only and shouldn't be rendered");
  }
}

Route.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default Route;

/* eslint "react/require-default-props": 0 */
/* eslint "react/forbid-prop-types": 0 */
import PropTypes from 'prop-types';

// This code draws on the simple router created there; thanks (again) TJ!

import React, { Component } from 'react';
import enroute from 'enroute';
import invariant from 'invariant';

/**
 * The custom router we build. It handles the basics of client-side
 * routing for our react application
 * @module letters/components
 * @type {Object}
 */
class Router extends Component {
  // You could also take advantage of class properties and store routes there
  // routes = {};
  static normalizeRoute(pathToNormalize, parentComponent) {
    // If there's just a /, it's an absolute route
    if (pathToNormalize[0] === '/') {
      return pathToNormalize;
    }
    // No parent, no need to join stuff together
    if (!parentComponent) {
      return pathToNormalize;
    }
    // Join the child to the parent route
    return `${parentComponent.route}/${pathToNormalize}`;
  }

  static cleanPath(pathToClean) {
    pathToClean.replace(/\/\//g, '/');
  }

  constructor(props) {
    super(props);

    // We'll store the routes on the Router component
    this.routes = {};

    // Add all the children components to the routes
    this.addRoutes(props.children);

    // Set up the router for matching & routing
    this.enrouteThisRoutes = enroute(this.routes);
  }

  addRoute(element, parent) {
    // Get the component, path, and children props from a given child
    const { component, path, children } = element.props;

    // Ensure that it has the right input, since PropTypes can't really help here
    invariant(component, `Route ${path} is missing the "path" property`);
    invariant(typeof path === 'string', `Route ${path} is not a string`);

    // Set up Component to be rendered
    const customRender = (parameters, renderProps) => {
      const finalProps = { parameters, ...this.props, ...renderProps };

      // Or, using the object spread operator (currently a candidate
      // proposal for future versions of JavaScript)
      // const finalProps = {
      //   ...this.props,
      //   ...renderProps,
      //   parameters,
      // };

      const elementsChildren = React.createElement(component, finalProps);

      return parent ? parent.render(parameters, { elementsChildren }) : elementsChildren;
    };

    // Set up the route itself (/a/b/c)
    const route = this.normalizeRoute(path, parent);

    // If there are children, add those routes, too
    if (children) {
      this.addRoutes(children, { route, customRender });
    }

    // Set up the route on the routes property
    this.routes[this.cleanPath(route)] = customRender;
  }

  addRoutes(routes, parent) {
    React.Children.forEach(routes, (route) => this.addRoute(route, parent));
  }

  render() {
    const { location } = this.props;
    invariant(location, '<Router/> needs a location to work');
    return this.enrouteThisRoutes(location);
  }
}

Router.propTypes = {
  children: PropTypes.array,
  location: PropTypes.string.isRequired,
};

export default Router;

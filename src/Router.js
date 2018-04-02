import React, { Component } from "react";
import page from "page";
import store from "./store";
import Layout from "./Layout";
const components = require.context("./pages", true);

const getPageComponent = path => components(`./${path}`).default;
const scrollTop = () => window.scroll(0, 0);

@store.subscribe(store.select("currentUser"))
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = { C: null, context: null };
    this.mount(props.routes);
  }

  mount(routes) {
    Object.keys(routes).forEach(path => {
      const { filters, component } = this.interpretEntry(routes[path]);
      page(...[path, ...filters, this.dispatch(component), scrollTop]);
    });
  }

  interpretEntry = arg => {
    if (!Array.isArray(arg))
      return { filters: [], component: getPageComponent(arg) };
    return {
      filters: arg.slice(0, -1).map(filter => this[filter]),
      component: getPageComponent(arg[arg.length - 1])
    };
  };

  dispatch = component => (context, next) => {
    this.setState({ C: component, context });
    next();
  };

  componentWillMount() {
    page();
  }

  requireAuthentication = (ctx, next) => {
    if (this.state.currentUser) return next();
    store.alertMessage("ログインが必要です");
    page("/");
  };

  render() {
    const { C, context } = this.state;
    return (
      <Layout context={context}>
        <C context={context} />
      </Layout>
    );
  }
}

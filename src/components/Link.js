import page from "page";
import React from "react";

const transition = path => event => {
  event.preventDefault();
  return page(path);
};

export const push = path => page(path);

const Link = ({ children, to }) => (
  <a href={to} onClick={transition(to)}>
    {children}
  </a>
);

export default Link;

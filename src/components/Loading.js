import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = ({ loading }) => {
  if (!loading) return null;
  return (
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  );
};

export default Loading;

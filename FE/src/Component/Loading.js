import { Spinner } from "react-bootstrap";
import { Skeleton, Space, Spin } from "antd";
import { useState } from "react";
function Loading(props) {
  return (
    <div className="load-data">
      <Spin className="load-spiner" size="large" spinning />
    </div>
  );
}
export default Loading;

import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
    // log the error or perform any necessary actions
  }

  render() {
    if (this.state.hasError) {
      // fallback UI
      return (
        <div className="text-center w-full flex justify-center items-center flex-col gap-4 p-5">
          <h1 className="text-red-500 ">Something went wrong!</h1>
          <div className="w-full rounded-md bg-red-300 break-words overflow-auto p-3">
            {JSON.stringify(this.state?.error?.message)}
          </div>
          <div className="w-full max-w-sm rounded-md bg-blue-200 break-words overflow-auto p-3">
            {JSON.stringify(this.state?.info)}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ErrorBoundary;

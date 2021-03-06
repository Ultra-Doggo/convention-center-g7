import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {LocalStorage} from "../services/LocalStorage";

export default function RouteWrapper({
    isPrivate,
    storage,
    ...rest
    }) {

    if (isPrivate && !storage.isSigned()) {
        return <Redirect to="/" />;
    }
    
    return <Route {...rest} />;
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    storage: PropTypes.instanceOf(LocalStorage).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
};

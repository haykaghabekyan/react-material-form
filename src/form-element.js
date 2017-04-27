import React from "react";

import extend from "lodash/extend";

class FormElement extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            errors: {},
            formData: {}
        };

        this.updateFormElement = this.updateFormElement.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getChildContext () {
        return {
            updateFormElement : this.updateFormElement
        };
    }

    updateFormElement (data) {

        let {formData, errors} = this.state;

        if (data.value) {
            formData = extend(formData, {
                [data.name]: data.value
            });
        }

        if (data.error) {
            errors = extend(errors, {
                [data.name]: data.error
            });
        } else {
            delete errors[data.name];
        }

        this.setState({
            formData: formData,
            errors: errors
        });

        this.props.onChange(this.state);

    }

    onSubmit (e) {
        e.preventDefault();

        this.props.onSubmit();
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>{this.props.children}</form>
        );
    }

}

FormElement.propTypes = {
    onChange: React.PropTypes.func
};

// make information available to its children
FormElement.childContextTypes = {
    updateFormElement: React.PropTypes.func
};

export default FormElement;
import React from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";

import {isNotEmpty, isNumber, isLetters, isEmailAddress} from "./validators";

class TextInputElement extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            [props.name]: props.defaultValue,
            errors: []
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount () {
        const {name} = this.props;

        const errors = this.validate(this.state[name]);

        if (errors.length) {
            this.context.updateFormElement({
                name: name,
                error: true
            });
        }
    }

    validate (value) {

        value = value || "";

        const {required, letters, email, number} = this.props;

        let errors = [];

        if (required && !isNotEmpty(value)) {
            errors.push("This field is required.");
        }

        if (letters && !isLetters(value)) {
            errors.push("This field contains only letters.");
        }

        if (email && !isEmailAddress(value)) {
            errors.push("Email is not valid.");
        }

        if (number && !isNumber(value)) {
            errors.push("This field contains only numbers.");
        }

        return errors;
    }

    onChange (event: any, value: string) {
        const {name} = this.props;

        const errors = this.validate(value);

        this.setState({
            [name]: value,
            errors: errors
        });

        let data = {
            name: name,
            value: value
        };

        if (errors.length) {
            data.error = true;
        }

        if (this.context.updateFormElement) {
            this.context.updateFormElement(data);
        }
    }

    render () {
        const {type="text", id, hintText, fullWidth=false} = this.props;
        const {errors} = this.state;

        return (
            <TextField
                type={type}
                id={id}
                hintText={hintText}
                fullWidth={fullWidth}
                onChange={this.onChange}
                errorText={errors.join(" ")}
            />
        );
    }

}

// Access parent context by defining contextTypes
TextInputElement.contextTypes = {
    updateFormElement: PropTypes.func
};

export default TextInputElement;
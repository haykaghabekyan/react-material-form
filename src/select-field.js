import React from "react";
import PropTypes from "prop-types";

import {isNotEmpty} from "./validators";

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class MySelectField extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            [props.name]: props.value,
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

        const {required} = this.props;

        let errors = [];

        if (required && !isNotEmpty(value)) {
            errors.push("This field is required.");
        }

        return errors;
    }

    onChange (e, i, value) {

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

        this.context.updateFormElement(data);
    }

    render () {
        const {name, options, floatingLabelText} = this.props;
        const {errors} = this.state;

        return (
            <SelectField
                floatingLabelText={floatingLabelText}
                value={this.state[name]}
                onChange={this.onChange}
                fullWidth={true}
                selectedMenuItemStyle={{ color: 'rgb(0, 188, 212)' }}
                errorText={errors.join(" ")}
            >
                {
                    options.map((option, key) => {
                        return <MenuItem
                            key={key}
                            value={option.value}
                            primaryText={option.label}
                        />;
                    })
                }
            </SelectField>
        );
    }
}

// Access parent context by defining contextTypes
MySelectField.contextTypes = {
    updateFormElement: PropTypes.func
};

export default MySelectField;
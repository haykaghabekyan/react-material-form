# react-material-form

react-material-form is a set of react components, for validating forms using material-ui for react.

#Install
npm install react-material-form --save

#Available validation rules
required, email, letters, number

#Usage
Check code available on [Github](https://github.com/haykaghabekyan/react-redux/blob/master/src/public/js/components/login/login.js) or the code snippet bellow

```javascript
import React from "react";
import {MyForm, MyTextField, MySelectField} from "react-material-form";
import RaisedButton from "material-ui/RaisedButton";

const isEmptyObject = (obj) =>  {
    for(let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return true;
};

class Login extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            errors: {},
            formData: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit () {
        const {errors, formData} = this.state;

        const isValidForm = isEmptyObject(errors);

        if (!isValidForm) {
            return false;
        }

        // Handle submit
        console.log(formData);
    }

    onChange (data) {
        this.setState(data);
    }

    render () {
        return (
            <FormElement onSubmit={this.onSubmit} onChange={this.onChange}>
                <div>
                    <MyTextField
                        email
                        id="email"
                        name="email"
                        hintText="Email"
                        fullWidth={true}
                    />
                </div>

                <div>
                    <MyTextField
                        required
                        type="password"
                        id="password"
                        name="password"
                        hintText="Password"
                        fullWidth={true}
                    />
                </div>

                <div>
                    <MySelectField
                        required
                        name="gender"
                        floatingLabelText="Select your gender"
                        options={[{label: "Male", value: "male"}, {label: "Female", value: "female"}]}
                    />
                </div>

                <div>
                    <RaisedButton type="submit" label="Submit" primary={true} disabled={!isEmptyObject(this.state.errors)}/>
                </div>
            </FormElement>
        );
    }

}

export default Login;
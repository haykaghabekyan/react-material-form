# react-material-form

First install material-ui (preferred version is 0.17.4) by following steps on https://github.com/callemall/material-ui

Install react-material-form

npm install react-material-form --save

Usage

check https://github.com/haykaghabekyan/react-redux/blob/master/src/public/js/components/login/login.js or the code bellow

    import {FormElement, TextInputElement} from "react-material-form";
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
        }
    
        onChange (data) {
            this.setState(data);
        }
    
        render () {
            return (
                <FormElement onSubmit={this.onSubmit} onChange={this.onChange}>
                    <div>
                        <TextInputElement email id="email" name="email" hintText="Email" fullWidth={true} />
                    </div>
    
                    <div>
                        <TextInputElement required type="password" id="password" name="password" hintText="Password" fullWidth={true} />
                    </div>
    
                    <div>
                        <RaisedButton type="submit" label="Submit" primary={true} disabled={!isEmptyObject(this.state.errors)}/>
                    </div>
                </FormElement>
            );
        }
    
    }
    
    export default Login;
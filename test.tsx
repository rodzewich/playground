/// <reference path="./types/react/react.d.ts" />
/// <reference path="./types/react-dom/react-dom.d.ts" />
/// <reference path="./types/react-bootstrap/react-bootstrap.d.ts" />

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {ButtonToolbar, Button, Input, ButtonInput} from 'react-bootstrap';

class MyComponent extends React.Component {

    render() {
        return <form>
            <Input type="text" label="Text" placeholder="Enter text" />
            <Input type="email" label="Email Address" placeholder="Enter email" />
            <Input type="password" label="Password" />
            <Input type="file" label="File" help="[Optional] Block level help text" />
            <Input type="checkbox" label="Checkbox" checked readOnly />
            <Input type="radio" label="Radio" checked readOnly />
            <Input type="select" label="Select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
            </Input>
            <Input type="select" label="Multiple Select" multiple>
                <option value="select">select (multiple)</option>
                <option value="other">...</option>
            </Input>
            <Input type="textarea" label="Text Area" placeholder="textarea" />
            <ButtonInput value="Button Input" />
            <ButtonInput type="reset" value="Reset Button" />
            <ButtonInput type="submit" value="Submit Button" />
        </form>
    }
}

console.log("------------------------");
console.log(ReactDOMServer.renderToStaticMarkup(new MyComponent().render()));
console.log("------------------------");
console.log(ReactDOMServer.renderToString(new MyComponent().render()));


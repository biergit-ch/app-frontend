import React from 'react'
import { WebAuthentication } from '../../src/utils/auth/WebAuthentication';

export default class SignedIn extends React.Component {
    componentDidMount() {
        const auth = new WebAuthentication();
        auth.handleAuthentication();
    }
    render() : any {
        return null
    }
}

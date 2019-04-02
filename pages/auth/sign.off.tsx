import React from 'react'
import { WebAuthentication } from '../../src/utils/auth/WebAuthentication';

export default class SignOff extends React.Component {
    componentDidMount() {
        const auth = new WebAuthentication();
        auth.logout();
    }
    render() {
        return null
    }
}

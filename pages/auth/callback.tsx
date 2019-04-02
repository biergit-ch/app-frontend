import PropTypes from 'prop-types'
import React from 'react'
import { WebAuthentication } from '../../src/utils/auth/WebAuthentication';


export default class SignedIn extends React.Component {
    static propTypes = {
        url: PropTypes.object.isRequired
    }

    componentDidMount() {
        const auth = new WebAuthentication();
        auth.handleAuthentication();
    }
    render() {
        return null
    }
}

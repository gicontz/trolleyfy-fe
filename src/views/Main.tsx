import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { Container } from '../components/Containers';

interface Props {
    children: ReactNode;
}

export default class Main extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <p>I am Main Container</p>
            </Container>
        )
    }
};
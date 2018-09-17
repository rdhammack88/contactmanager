import React, { Component } from 'react';

class Test extends Component {

    state = {
        // test: true,
        title: '',
        body: ''
    }

    componentDidMount() {
        // console.log('Component Mounted');
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    body: data.body
                })
            })
    }

    componentWillMount() {
        console.log('Component Will Mount');
    }

    componentDidUpdate() {
        console.log('Component Did Update!');
    }

    componentWillUpdate() {
        console.log('Component Will Update');
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log(`Component Will Receive Props: ${nextProps} - ${nextState}`)
    }

    /** Use the UNSAFE_ flag for and componentWill... LifeCycle Method in React >== 17 */
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        console.log(`Component Will Receive Props: ${nextProps} - ${nextState}`)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return null;
        // return {
        //     test: false
        // }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // console.log('getSnapshotBeforeUpdate');
        return null
    }

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <h1>Test Component</h1>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        )
    }
}

export default Test;

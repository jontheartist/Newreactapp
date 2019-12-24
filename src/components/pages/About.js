// rcf

import React from 'react'

function About() {
    return (
        //This doesnt show in DOM but won't show on the JSX when returning something
        <React.Fragment >
            <h1> About </h1>
            <p>This is the TodoList App version v1.0.0 </p>
        </React.Fragment >
    )
}


export default About;
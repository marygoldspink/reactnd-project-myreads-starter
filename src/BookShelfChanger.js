import React from 'react';

// This is a functional React component to change the value of the current shelf.
// It fires a handleChange event to the parent component who can then say which book
// this event was fired for.
// We also try to protect this component from being rendered when there is no value.
function BookShelfChanger(props) {
    return props.value ? (
        <select value={props.value} onChange={props.handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    ) : ''
}

export default BookShelfChanger
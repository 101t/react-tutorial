import React from 'react';

const Profile = (props) => {
	console.log(props);
	return (
		<div>Profile { props.match.url }</div>
	)
}

export default Profile;
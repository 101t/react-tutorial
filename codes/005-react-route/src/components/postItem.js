import React from 'react';


const PostItem = (props) => {
	return (
		<div>
			Post Item { props.match.params.id }
		</div>
	)
}

export default PostItem;
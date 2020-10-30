import React from 'react'

function Title({ index, value }) {
	console.log('Title')
	return (
		<div>
			<p>{index}</p>
			<p>{value}</p>
		</div>
	)
}
export default React.memo(Title)

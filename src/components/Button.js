import React, { useContext } from 'react'
import { InputContext } from './WrappedComponents'

function Button({ index }) {
	console.log('Button')
	const dispatch = useContext(InputContext)
	return (
		<div>
			<button
				disabled={index <= 0}
				onClick={() => dispatch({ type: 'PASS', value: '' })}>
				パス
			 </button>
		</div>
	)
}
export default React.memo(Button)
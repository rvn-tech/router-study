import { useState, useRef } from 'react';

function useCounter() {
	const [count, setCount] = useState({ min: 0, sec: 0, ms: 0 })
	const stop = () => {
		console.log('stop')
		clearInterval(intervalRef.current)
	}
	const intervalRef = useRef()
	const start = () => {
		console.log('start')
		intervalRef.current = setInterval(() => {
			setCount(prevCount => {
				let [min, sec, ms] = Object.values(prevCount)
				ms = ms + 1
				if (ms > 99) {
					sec = sec + 1
					ms = 0
					if (sec > 59) {
						min = min + 1
						sec = 0
					}
				}
				return { min: min, sec: sec, ms: ms }
			})
		}, 10)
	}
	const formatter = new Intl.NumberFormat('ja', { minimumIntegerDigits: 2 })
	const counter = () => `${count.min}:${formatter.format(count.sec)}:${formatter.format(count.ms)}`
	return [counter, start, stop]
}

export default useCounter

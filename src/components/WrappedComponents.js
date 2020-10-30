import React, { useState, useEffect, useContext, useCallback, useRef, useReducer, createContext } from 'react'
import { Link } from 'react-router-dom'
import { ItemsContext, LangContext } from '../App'
import Title from './Title'
import Button from './Button'
import FocusInput from './FocusInput'
import useCounter from '../hooks/useCounter'
import useHiraganaka from '../hooks/useHiraganaka'

export const InputContext = createContext()

const speech = new window.webkitSpeechRecognition()

function WrappedComponents() {
    const Items = useContext(ItemsContext)
    const Lang = useContext(LangContext)
    const [counter, start, stop] = useCounter()
    const hiraganaka = useHiraganaka()
    const [hiragana, setHiragana] = useState('')
    const [index, setIndex] = useState(0)
    const [title, setTitle] = useState('')
    const inputRef = useRef()

    const judge = useCallback(v => {
	if (index >= Items.length) {
	    return false
	}
	switch (Lang) {
	    case 'ja-JP':
		return v === hiragana || v === Items[index].a
	    default:
		return v === Items[index].a
	}
    }, [index, hiragana])

    const reducer = (state, action) => {
	switch (action.type) {
	    case 'VOICE':
	    case 'KEYBOARD':
		if (judge(action.value)) {
		    setIndex(prev => prev + 1)
		    return ''
		} else {
		    return action.value
		}
	    case 'PASS':
		setIndex(prev => prev + 1)
		return ''
	    case 'CLEAR':
		return ''
	    default:
		return state
	}
    }

    const [input, dispatch] = useReducer(reducer, '')

    const next = i => {
	if (Lang === 'ja-JP') {
	    hiraganaka(Items[i].a).then((res) => {
		setHiragana(res.data.converted)
	    })
	}
	setTitle(Items[i].q)
    }

    useEffect(() => {
	if (index < Items.length) {
	    next(index)
	} else {
	    setTitle('')
	    stop()
	}
    }, [index])

    useEffect(() => {
	next(0)
	setTitle(Items[0].q)
	setUp()
	inputRef.current.focus()
	start()
	return stop
    }, [])

    const setUp = () => {
	if ('webkitSpeechRecognition' in window) {
	    speech.lang = Lang
	    speech.onspeechstart = () => {
		dispatch({ type: 'CLEAR' })
	    }
	    speech.onresult = e => {
		console.log('onresult')
		switch (Lang) {
		    case 'ja-JP':
			hiraganaka(e.results[0][0].transcript).then(res => {
			    dispatch({
				type: 'VOICE',
				value: res.data.converted
			    })
			})
			return
		    default:
			dispatch({
			    type: 'VOICE',
			    value: e.results[0][0].transcript
			})
		}
	    }
	    speech.onend = () => {
		speech.start()
	    }
	    speech.start()
	}
    }

    const handleFinising = () => {
	console.log('Link')
	stop()
	if (speech) {
	    speech.onend = () => { }
	    speech.stop()
	}
    }

    return (
	<div>
	<h2>{counter()}</h2>
	<Title index={Items.length - index} value={title} />
	<InputContext.Provider value={dispatch}>
	<Button index={Items.length - index} />
	<FocusInput ref={inputRef} input={input} />
	</InputContext.Provider>
	<div><Link to="../" onClick={handleFinising}>終了する</Link></div>
	</div>
    )
}

export default WrappedComponents

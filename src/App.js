import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css'
import WrappedComponents from './components/WrappedComponents'

export const ItemsContext = createContext()
export const LangContext = createContext()

function App() {
    const sampleText = '脆弱性=vulnerability\n認可=authority\n失効=revocation\n'
    const [items, setItems] = useState([{ q: '', a: '' }])
    const [text, setText] = useState(sampleText)
    const [columns, setColumns] = useState({ q: 0, a: 1 })
    const [sep, setSep] = useState('=')
    const [lang, setLang] = useState('en-US')
    const [message, setMessage] = useState('')
    const read = e => {
	var reader = new FileReader()
	reader.readAsText(e.target.files[0])
	reader.onload = event => {
	    setText(reader.result)
	}
    }
    const set = () => {
	let check = true
	setItems(text.trimEnd().split('\n').map(elem => {
	    let item = elem.split(sep)
	    if (item.length < 2) {
		check = false
		return {}
	    } else {
		return { q: item[columns.q], a: item[columns.a] }
	    }
	}))
	if (check) {
	    start()
	    setMessage('')
	} else {
	    setMessage('列数が不足しています')
	}
    }
    const start = () => {
    }
    return (
	<div className="App">
	<Router>
	<Switch>
	<Route path="/" exact>
	<div>
	<div><h2>設定</h2></div>
	<div><p style={{ color: "red" }}>{message}</p></div>
	<div><input type="file" onChange={read} /></div>
	<div><textarea rows="10" cols="32" value={text} onChange={e => setText(e.target.value)} /></div>
	<div><input type="text" style={{ width: 15 }} value={sep} onChange={e => { setSep(e.target.value) }} />区切り文字</div>
	<div><input type="checkbox" checked={columns.q === 1 && columns.a === 0} onChange={e => { e.target.checked ? setColumns({ q: 1, a: 0 }) : setColumns({ q: 0, a: 1 }) }} />入れ替える</div>
	<div><input type="checkbox" checked={lang === 'ja-JP'} onChange={e => { e.target.checked ? setLang('ja-JP') : setLang('en-US') }} />日本語入力</div>
	<div><Link to="./start" onClick={set}>スタート</Link></div>
	</div>
	</Route>
	<Route path="/start" exact>
	<ItemsContext.Provider value={items}>
	<LangContext.Provider value={lang}>
	<WrappedComponents />
	</LangContext.Provider>
	</ItemsContext.Provider>
	</Route>
	</Switch>
	</Router>
	</div>
    )
}

export default App

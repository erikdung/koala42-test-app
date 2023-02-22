import './App.css'

import type { RootState } from './app/store'
import { useSelector } from 'react-redux'
import Table from './components/Table'

function App() {
	const data = useSelector((state: RootState) => state.data.records)

	return (
		<Table data={data} />
	)
}

export default App

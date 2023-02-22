import { useReducer, useCallback, MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'

import { IData, removeNode } from "../app/dataSlice"
import Table from "./Table"

interface IProps {
	data: IData
	index: number
	parentIndexes?: number[]
	columns: string[]
}

export default function Row({data, columns, index, parentIndexes = []}: IProps) {
	const dispatch = useDispatch()

	const handleRemove = useCallback<MouseEventHandler<HTMLTableCellElement>>((e) => {
		e.stopPropagation()
		e.preventDefault()
		dispatch(removeNode([...parentIndexes, index]))
	}, [index, parentIndexes, dispatch])

	const children = (data.children.has_nemesis || data.children.has_secrete)?.records

	const [showChildren, toggleChildren] = useReducer((state) => !state, false)

	const cn = index % 2 > 0 ? 'odd' : 'even'

	return (
		<>
			<tr className={cn} onClick={toggleChildren}>
				{!!children && <td className='toggle-row'>{showChildren ? '-' : '+'}</td>}
				{!children && <td></td>}
				{columns.map((col) => <td key={data.data[col]}>{data.data[col]}</td>)}
				<td className='delete' onClick={handleRemove}>x</td>
			</tr>
			{!!children && showChildren && <tr className={cn}>
				<td colSpan={columns.length + 2}>
					<Table parentIndexes={[...parentIndexes, index]} data={children} />
				</td>
			</tr>}
		</>
	)
}
import { IData } from '../app/dataSlice'
import Row from './Row'

interface IProps {
	data: IData[]
	parentIndexes?: number[]
}

export default function Table ({data, parentIndexes}: IProps) {
	if (!data.length) {
		return null
	}
	const columns = Object.keys(data[0].data)
	return (
		<div className='table-wrapper'>
			<table>
				<thead>
					<tr>
						<th></th>
						{columns.map((key) => (<th key={key}>{key}</th>))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (<Row key={index} parentIndexes={parentIndexes} index={index} columns={columns} data={row} />))}
				</tbody>
			</table>
		</div>
	)
}


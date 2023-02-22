import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import exampleData from '../data/example-data.json'

export interface IData {
	children: {
		has_nemesis?: {
			records: IData[]
		}
		has_secrete?: {
			records: IData[]
		}
	}
	data: {
		[key: string]: string
	}
}

export interface DataState {
	records: IData[]
}

const initialState: DataState = {
	records: exampleData
}

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		removeNode: (state, action: PayloadAction<number[]>) => {
			const parentNode = action.payload.slice(0, action.payload.length - 1)
				.reduce<DataState|undefined>((acc, key) => {
					if (!acc?.records[key]?.children) {
						return acc
					}
					return (acc.records[key].children.has_nemesis || acc.records[key].children.has_secrete)
				}, state)

			parentNode?.records.splice(action.payload.slice(-1)[0], 1)
		}
	},
})

export const { removeNode } = dataSlice.actions

export default dataSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
    data: number;
}

const initialState: CounterState = {
    data: 42
}

export const incrementleg = (amount=1) => ({ type: 'increment', payload: amount });
export const decrementleg = (amount=1) => ({ type: 'decrement', payload: amount });

export const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload;
        },
        decrement: (state, action) => {
            state.data -= action.payload;
        },
        reset: (state) => {
            state.data = initialState.data;
        },
        set: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { increment, decrement, reset, set } = CounterSlice.actions;

export default function counterReducer(state = initialState, action: { type: string, payload?: any }): CounterState {
    switch (action.type) {
        case 'increment':
            return { ...state, data: state.data + (action.payload ?? 1) };
        case 'decrement':
            return { ...state, data: state.data - (action.payload ?? 1) };
        case 'reset':
            return { ...state, data: initialState.data };
        case 'set':
            return { ...state, data: action.payload ?? state.data };
        default:
            return state;
    }
}

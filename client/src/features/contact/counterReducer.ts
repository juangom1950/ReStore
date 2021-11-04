export const INCREMENT_COUNTER = "INCREMENT_CONUTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux conter'
}

export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            //Here we create a new copy of the state. We can't mutate the state. 
            //Something like this: state + 1
            return {
                ...state,
                data: state.data + 1
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - 1
            }
    
        default:
            return state;
    }
}
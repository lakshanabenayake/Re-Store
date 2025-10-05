import { ButtonGroup, Typography } from "@mui/material";
import {increment,decrement,reset,set} from "./conterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function ContactPage() {
  const {data} = useAppSelector(state  => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
    <Typography variant="h3" gutterBottom>
      the data is {data}
    </Typography>
    <ButtonGroup>
      <button onClick={() => dispatch(increment(10))}>Increment by 10</button>
      <button onClick={() => dispatch(decrement(5))}>Decrement by 5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(set(100))}>Set to 100</button> 
    </ButtonGroup>
    </>
  )
}

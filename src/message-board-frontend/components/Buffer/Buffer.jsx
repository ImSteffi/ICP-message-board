import { useState, useEffect } from "react";
import { message_board_backend as canister } from "../../../declarations/message-board-backend";

function BufferClass() {
  const [size, setSize] = useState(null);
  const [bookValues, setBookValues] = useState([]);
  const [getOptTrueValue, setGetOptTrue] = useState([]);
  const [getOptFalseValue, setGetOptFalse] = useState([]);

  const get = async () => {
  const newSize = await canister.getBookBufferSize();
    setSize(Number(newSize));
  };

  const fetchBookValues = async () => {
    const values = await canister.getBookValues();
    setBookValues(values);
  };

  const add = async () => {
    await canister.addValueToBookBuffer("Book X");
    await fetchBookValues();
  };

  const getOptTrue = async () => {
    const index = await canister.getBookBufferSize();
    const getOptValue = await canister.getOptValue(index);
    setGetOptTrue(Number(getOptValue));
    console.log(setGetOptTrue);
  };

  const getOptFalse = async () => {
    const wrongIndex = (await canister.getBookBufferSize()) + 1;
    console.log(wrongIndex);
    const getOptValue = await canister.getOptValue(wrongIndex);
    setGetOptFalse(getOptValue);
  };

  return (
    <main>
      <div>
        <h2>size</h2>
        <h3>: {size}</h3>
        <button onClick={get}>size()</button>
      </div>
      <div>
        <h2>add</h2>
        {bookValues.map((value, index) => (
          <h3 key={index}>: {value}</h3>
        ))}
        <button onClick={add}>add()</button>
      </div>
      <div>
        <h2>getOpt</h2>
        <h3>True res: {getOptTrueValue}</h3>
        <h3>False res: {getOptFalseValue}</h3>
        <button onClick={getOptTrue}>getOpt() - True</button>
        <button onClick={getOptFalse}>getOpt() - False / Error</button>
      </div>
    </main>
  );
}

export default BufferClass;

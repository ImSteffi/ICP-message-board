import { useState, useEffect } from "react";
import { message_board_backend as canister } from "../../../declarations/message-board-backend";

function BufferClass() {
  const [size, setSize] = useState(null);
  const [bookValues, setBookValues] = useState([]);
  const [getOptTrueValue, setGetOptTrue] = useState([]);
  const [getOptFalseValue, setGetOptFalse] = useState([]);
  const [putValue, setPutValue] = useState([]);
  const [removeLastValue, setRemoveLastValue] = useState([]);
  const [capacityAmount, setCapacityAmount] = useState(null);
  const [reserveAmount, setReserveAmount] = useState(null);

  const get = async () => {
    const res = await canister.getBookBufferSize();
    setSize(Number(res));
  };

  const fetchBookValues = async () => {
    const res = await canister.getBookValues();
    setBookValues(res);
  };

  const add = async () => {
    await canister.addValueToBookBuffer("Book X");
    await fetchBookValues();
  };

  const getOptTrue = async () => {
    const index = await canister.getBookBufferSize();
    const res = await canister.getOptValue(index);
    setGetOptTrue(res);
  };

  const getOptFalse = async () => {
    const res = await canister.getOptValue(999999);
    setGetOptFalse(res);
  };

  const put = async () => {
    let index = await canister.getBookBufferSize();
    index = Number(index);
    if (index > 0) {
      index--;
    }
    const x = "bookChange";
    const res = await canister.putBookValue(index, x);
    setPutValue(res);
  };

  const removeLast = async () => {
    const res = await canister.removeLastBookValue();
    setRemoveLastValue(res);
  };
  
  const remove = async (index) => {
    const res = await canister.removeBookValue(index);
    fetchBookValues();
  };

  const clearBook = async () => {
    await canister.clearBook();
    fetchBookValues();
  };

  const filterEntries = async () => {
    await canister.filterBookEntries();
  };

  const capacity = async () => {
    let res = await canister.getBookCapacity();
    res = Number(res);
    setCapacityAmount(res); 
  };

  const reserve = async () => {
    const x = 20;
    let res = await canister.reserveBookCapacity(x);
    res = Number(res);
    setReserveAmount(res);
  };

  useEffect(() => {
    fetchBookValues();
  });

  return (
    <main>
      <div>
        <h2>size</h2>
        <h3>: {size}</h3>
        <button onClick={get}>size()</button>
      </div>
      <hr></hr>
      <div>
        <h2>add</h2>
        {bookValues.map((value, index) => (
          <h3 key={index}>: {value}</h3>
        ))}
        <button onClick={add}>add()</button>
      </div>
      <hr></hr>
      <div>
        <h2>getOpt</h2>
        <h3>True res: {getOptTrueValue}</h3>
        <h3>False res: {getOptFalseValue}</h3>
        <button onClick={getOptTrue}>getOpt() - True</button>
        <button onClick={getOptFalse}>getOpt() - False / Error</button>
      </div>
      <hr></hr>
      <div>
        <h2>put</h2>
        <p>Overwrites at index</p>
        <h3>Book X &rarr; {putValue}</h3>
        <button onClick={put}>put() Change BookX -&rarr; BookChange</button>
      </div>
      <hr></hr>
      <div>
        <h2>removeLast</h2>
        <p>Removes and returns the last item in the buffer or `null` if the buffer is empty</p>
        <h3>{removeLastValue}</h3>
        <button onClick={removeLast}>removeLast()</button>
      </div>
      <hr></hr>
      <div>
        <h2>remove</h2>
        <p>Removes and returns the element at `index` from the buffer</p>
        {bookValues.map((value, index) => (
          <div key={index}>
            <h3>{value} | i: {index}</h3>
            <button onClick={() => remove(index)}>remove() | i: {index}</button>
          </div>
        ))}
      </div>
      <hr></hr>
      <div>
        <h2>clear</h2>
        <p>Resets the buffer</p>
        <h3>{bookValues}</h3>
        <button onClick={clearBook}>clear()</button>
      </div>
      <hr></hr>
      <div>
        <h2>filterEntries</h2>
        <p>Filtering method for REMOVING data collections</p>
        <p>Scenarios where you need to conditionally REMOVE elements based on certain criteria</p>
        <button onClick={filterEntries}>filterEntries()</button>
        <p>Creates 10 books then checks if index is even</p>
      </div>
      <hr></hr>
      <div>
        <h2>capacity</h2>
        <p>Returns the capacity of the buffer (the length of the underlying array)</p>
        <h3>{capacityAmount}</h3>
        <button onClick={capacity}>capacity()</button>
      </div>
      <hr></hr>
      <div>
        <h2>reserve</h2>
        <p>Changes the capacity to X</p>
        <h3>Capacity amount: {capacityAmount} | Changed to: {reserveAmount}</h3>
        <button onClick={reserve}>reserve()</button>
      </div>
    </main>
  );
}

export default BufferClass;

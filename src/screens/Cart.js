import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    let username = localStorage.getItem("username");
    let currentDate = new Date().toDateString();

    try {
      const response = await fetch("http://localhost:4000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          username: username,
          order_date: currentDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch({ type: "DROP" });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleRemoveItem = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (!data || data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{ color: '#fff' }}>The Cart is Empty!</div>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover' style={{ color: '#fff' }}>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' style={{ color: '#fff' }}>#</th>
              <th scope='col' style={{ color: '#fff' }}>Name</th>
              <th scope='col' style={{ color: '#fff' }}>Quantity</th>
              <th scope='col' style={{ color: '#fff' }}>Option</th>
              <th scope='col' style={{ color: '#fff' }}>Amount</th>
              <th scope='col' style={{ color: '#fff' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' style={{ color: '#fff' }}>{index + 1}</th>
                <td style={{ color: '#fff' }}>{food.name}</td>
                <td style={{ color: '#fff' }}>{food.qty}</td>
                <td style={{ color: '#fff' }}>{food.size}</td>
                <td style={{ color: '#fff' }}>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => handleRemoveItem(index)}>
                    <DeleteIcon style={{ color: '#fff' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2' style={{ color: '#fff' }}>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}

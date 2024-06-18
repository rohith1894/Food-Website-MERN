import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const username = localStorage.getItem('username');
    try {
      const response = await axios.post("http://localhost:4000/api/myorderdata", {
        username: username
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const orderData = response.data.orderData ? response.data.orderData.order_data : [];
      setOrderData(Array.isArray(orderData) ? orderData : []);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (orderData.length === 0) {
    return <div className="center-message">You haven't ordered anything till now.</div>;
  }

  return (
    <div className='container'>
      <div className='row'>
        {orderData.slice().reverse().map((order, index) => (
          <div key={index}>
            {order.map((arrayData, subIndex) => (
              <div key={subIndex}>
                {arrayData.Order_date ? (
                  <div className='m-auto mt-5'>
                    {arrayData.Order_date}
                    <hr />
                  </div>
                ) : (
                  <div className='col-12 col-md-6 col-lg-3'>
                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                      <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                      <div className="card-body">
                        <h5 className="card-title">{arrayData.name}</h5>
                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                          <span className='m-1'>{arrayData.qty}</span>
                          <span className='m-1'>{arrayData.size}</span>
                          <div className='d-inline ms-2 h-100 w-20 fs-5'>
                            ₹{arrayData.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;

// CSS for center message
const styles = `
  .center-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: #555;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

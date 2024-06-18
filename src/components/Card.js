import React, { useState, useRef, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

function Card(props) {
    const data = useCart();
    const dispatch = useDispatchCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');
    const options = props.options && props.options.length > 0 ? props.options[0] : {};
    const priceOptions = Object.keys(options);
    const priceRef = useRef();
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    useEffect(() => {
        const calculateFinalPrice = () => {
            const selectedSize = size;
            const selectedQty = qty;
            if (options[selectedSize]) {
                return parseInt(options[selectedSize]) * parseInt(selectedQty);
            }
            return 0;
        };
        const newFinalPrice = calculateFinalPrice();
        setFinalPrice(newFinalPrice);
    }, [qty, size, options]);

    const handleAddToCart = async () => {
        if (!localStorage.getItem('username')) {
            alert('Please login to add items to your cart.');
            return;
        }

        let existingItem = data.find(item => item.id === props.foodItem._id && item.size === size);

        if (existingItem) {
            const newQty = existingItem.qty + qty;
            const newPrice = finalPrice;

            await dispatch({
                type: "UPDATE",
                id: props.foodItem._id,
                size: size,
                qty: newQty,
                price: newPrice
            });
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: props.foodItem.img
            });
        }
    };

    return (
        <div className="col mb-4">
            <div className="card h-100">
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "200px" }} />
                <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title text-center">{props.foodItem.name}</h5>
                    <div className='container w-100 d-flex align-items-center justify-content-center'>
                        <select className="m-2 h-100 bg-success text-black rounded" value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
                            {Array.from(Array(6), (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 bg-success text-black rounded" ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-3 fs-5'>Price: ₹{finalPrice}/-</div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success w-100" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;

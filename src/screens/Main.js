import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/foodData', {});
            const data = response.data;
            setFoodItems(data[0]);
            setFoodCat(data[1]);
        } catch (err) {
            console.error("There was an error loading the food items:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredCategories = foodCat.filter((cat) => {
        return foodItems.some(item => item.CategoryName === cat.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()));
    });

    return (
        <>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">
                                <div className="input-group w-75">
                                    <input
                                        className="form-control me-2 bg-white text-dark"
                                        type="search"
                                        placeholder="Search in here..."
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                    />
                                    {search.length > 0 &&
                                        <button
                                            className="btn btn-outline-danger"
                                            type="button"
                                            onClick={() => { setSearch('') }}
                                        >
                                            X
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://thumbs.dreamstime.com/b/perfect-hamburger-classic-burger-american-cheeseburger-isolated-white-reflection-giant-large-massive-thick-extra-toppings-59054909.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", height: "700px", width: "900px" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://ocakes.in/hyderabad/storage/app/public/images/item/item-642f5b5885a38.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", height: "700px", width: "900px" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://ontheflame.com/wp-content/uploads/2022/11/DSC_0207-2-1024x720.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", height: "700px", width: "900px" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    filteredCategories.length > 0
                        ? filteredCategories.map((data) => (
                            <div key={data._id} className='my-4'>
                                <div className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                <div className='row'>
                                    {foodItems.length > 0
                                        ? foodItems
                                            .filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                            .map((filterItems) => (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filterItems} options={filterItems.options} />
                                                </div>
                                            ))
                                        : <div className="fs-3 m-3 text-center">No items found</div>
                                    }
                                </div>
                            </div>
                        ))
                        : <div className="fs-3 m-3 text-center">No items found</div>
                }
            </div>
        </>
    )
}

export default Main;

import React, { Component } from 'react';
import Axios from 'axios'
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar'

class apiTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            price: undefined,
            quantity: undefined,
            productImage: null,
            prod: [],
            order: [],        }
    }

    static contextType = SocialMediaContext;

    componentWillMount() {
        this.getDataProd();
    }

    getDataProd = async () => {
        await Axios.get(`http://localhost:3000/prod`)
            .then(res => {
                // console.log(res.data);
                this.setState({ prod: res.data.products })
            })
    }

    // Add data

    // addData = async (e) => {
    //     e.preventDefault();
    //     await Axios.post(`http://localhost:3000/prod`, {
    //         name: this.state.name,
    //         price: this.state.price,
    //         quantity: this.state.quantity,
    //     })
    //         .then(res => {
    //             console.log(res.data)
    //         })
    // }

    onchangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Delete data

    deleteData = async (id) => {
        await Axios.delete(`http://localhost:3000/prod/${id}`)
            .then(res => {
                console.log(res.data)
            })
    }

    // Update data
    updateData = async (id, V1, V2, V3) => {
        const newName = this.state.name !== undefined ? this.state.name : V1;
        const newPrice = this.state.price !== undefined ? this.state.price : V2;
        const newQuantity = this.state.quantity !== undefined ? this.state.quantity : V3;

        await Axios.patch(`http://localhost:3000/prod/${id}`, [{
            "propName": "name", "value": newName
        },
        {
            "propName": "price", "value": newPrice
        },
        {
            "propName": "quantity", "value": newQuantity
        }]
        )
            .then(res => {
                console.log(res.data)
            });

    }

    // ********************* Add All Data insieme*************//

    AddAll = async (e) => {
        e.preventDefault();
        const element = document.querySelector("#ax").files[0]
        console.log(element)
        let data = new FormData();
        data.append('productImage', element);
        const NAME = data.append('name', this.state.name);
        const PRICE = data.append('price', this.state.price);
        const QUANTITY = data.append('quantity', this.state.quantity);
        if (element === undefined){
            alert("Please Choose a Foto")
        } else{
            await Axios.post(`http://localhost:3000/prod`, data, NAME, PRICE, QUANTITY)
                .then(res => {
                    console.log(res)
                })
        }}

    // ********************* Upload picture *************//

    uploadPic = ({ target: { files } }) => {
        console.log(files[0])
        let data = new FormData();
        data.append('productImage', files[0])
        Axios.post("http://localhost:3000/prod", data).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                <NavBar />
                <form onSubmit={this.AddAll}>
                    <input type="text" name="name" id="name" placeholder="Please Write Your Name" value={this.state.name} onChange={this.onchangeHandler} /><br />
                    <input type="text" name="price" id="price" placeholder="Please Write Your price" value={this.state.price} onChange={this.onchangeHandler} /><br />
                    <input type="text" name="quantity" id="quantity" placeholder="Please Write Your quantity" value={this.state.quantity} onChange={this.onchangeHandler} /><br />
                    <input type="file" id="ax" onChange={this.ChangeHandler} />
                    <button type="submit"> ADD </button>

                    {/* add Just Photo 
                    <input type="file" className="form-control profile-pic-uploader" onChange={this.uploadPic} /> */}

                </form>
                <p>{this.state.prod.count}</p>
                {this.state.prod.map(item =>
                    <div key={item._id}>
                        <p>Name: {item.name}</p>
                        <p>Product Id: {item._id}</p>
                        <img src={item.productImage} alt="" style={{ width: "10rem" }} /> <br />
                        <p>Price: {item.price}$</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => { this.deleteData(item._id); window.location.reload() }}>Delete</button>
                        <button onClick={() => { this.updateData(item._id, item.name, item.price, item.quantity); window.location.reload() }}>Update</button>
                    </div>
                )}
                <h1>Order</h1>
                <button onClick={this.getDataOrder}>Get order</button>
                <button onClick={this.context.getDataOrder}>Get order2</button>
                <button onClick={() => console.log(this.context.order)}>log</button>
                {this.context.order.map(item =>
                    <div key={item._id}>
                        <p>Product Id: {item._id}</p>
                        {/* <img src={item.productImage} alt="" style={{ width: "10rem" }} /> <br /> */}
                        <p>Quantity: {item.quantity}</p>
                        {/* <p>Order URL: {item.request.Order_URL}</p> */}
                    </div>
                )}
            </div>);
    }
}


export default apiTest;


### Welcome to the #react30 Day 9 challenge.

In this tutorial we will develop a shopping website using Reactjs Context API. This tutorial will teach you to develop an e-commerce website with basic functionality i.e. show products, add to cart, review and checkout and place & view orders.  
For routing we will use 'react-router-dom' npm package.

#### Key Points

- Context API used as global store (not redux)
- Mock data used in a json file (will not make any API calls to fetch it)

### Demo

<video width="100%" height="100%" controls>
  <source src="https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day9-demo.mp4?alt=media&token=6f9c9526-a99a-405f-8274-c96bd36df09c" type="video/mp4">
</video>

### Pre-requisites

- Code Editor (like VS Code)
- React basic knowledge
- Basic knowledge of HTML & CSS

### Lets Begin!

Open terminal in the vs code and run these commands,

```
npx create-react-app shoppinn
cd shoppinn
npm start
```

After doing all of this, your UI should look like,

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day3-first-ui.JPG?alt=media&token=35b62cde-9bb7-4a29-9685-a6a33d5c873f)

### Folder Structure

1. Add 'components', 'context' & 'mockData' folder in the 'src' folder.
2. Follow the below images to create same folder structure along with the js and css files.

Note - I have removed few files which 'create-react-app' util gives us by default.
<br/>

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day9-folder-1.png?alt=media&token=f8d5a901-b6c6-424e-b81e-4241fb7977be)
<br/>
![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day9-folder-2.png?alt=media&token=21a13ba5-cdf3-4cf7-9803-71407d578282)

### Lets code!

To develop this kind of project it has to have lots of react components to modularize our project.  
For example, 'ItemList.js' component to show list of 'Item.js' component in 'HomePage.js' component.  
We will use 'mockData' folder to have dummy data of products in a 'items.json' file. And 'context' folder to have Context API's global store. Lets begin by putting code in each file on by one.
<br/>

<details>
<summary >1. GlobalState.js</summary>

```js
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  cart: [],
  orders: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addItemToCartList = (item) => {
    dispatch({
      type: "ADD_ITEM_IN_CART",
      payload: item,
    });
  };

  const removeItemFromCartList = (item) => {
    dispatch({
      type: "REMOVE_ITEM_IN_CART",
      payload: item,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const addItemToOrderList = (item) => {
    dispatch({
      type: "ADD_ITEM_IN_ORDER",
      payload: item,
    });
  };

  const removeItemFromOrderList = (item) => {
    dispatch({
      type: "REMOVE_ITEM_IN_ORDER",
      payload: item,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        cart: state.cart,
        orders: state.orders,
        addItemToCartList,
        removeItemFromCartList,
        clearCart,
        addItemToOrderList,
        removeItemFromOrderList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
```

</details>

<details>
<summary >2. AppReducer.js</summary>

```js
import React from "react";

export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_IN_CART":
      return {
        ...state,
        cart: [action.payload, ...state.cart],
      };
    case "REMOVE_ITEM_IN_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "ADD_ITEM_IN_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case "REMOVE_ITEM_IN_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.orderId !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
```

</details>

<details>
<summary >3. index.js</summary>

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
```

</details>

<details>
<summary >4. App.js</summary>

```js
import "./App.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetail from "./components/itemDetail/ItemDetail";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

</details>

<details>
<summary >5. HomePage.js</summary>

```js
import React from "react";
//please get this json from our github repo
import items from "../../mockData/items.json";
import ItemList from "../itemList/ItemList";

function HomePage() {
  return (
    <section>
      <ItemList items={items} />
    </section>
  );
}

export default HomePage;
```

</details>

<details>
<summary >6. ItemList.js</summary>

```js
import React from "react";
import Item from "../item/Item";
import "./ItemList.css";
import { Link } from "react-router-dom";

function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Link to={`/item/${item.id}`} key={item.id}>
          <Item
            name={item.name}
            rating={item.rating}
            price={item.price}
            saleDiscount={item.saleDiscount}
            image={item.image}
            brand={item.brand}
          />
        </Link>
      ))}
    </div>
  );
}

export default ItemList;
```

</details>

<details>
<summary >7. Item.js</summary>

```js
import React from "react";
import "./Item.css";

function Item({ name, rating, price, saleDiscount, image, brand }) {
  return (
    <div className="item-card">
      <img src={image} alt={"Item image"} width="100%" />
      <div className="item-brand">{brand}</div>
      <div className="item-name">{name}</div>
      <div className="item-info">
        <div className="item-price">${price}</div>
        <div className="item-rating">{rating}&#9733;</div>
      </div>
    </div>
  );
}

export default Item;
```

</details>

<details>
<summary >8. ItemDetail.js</summary>

```js
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import items from "../../mockData/items.json";
import { GlobalContext } from "../../context/GlobalState";

const getItemDetail = (id) => items.filter((item) => item.id === id)[0];

function ItemDetail() {
  const params = useParams();
  const itemId = parseInt(params?.id);
  const item = !!itemId && getItemDetail(itemId);
  const { addItemToCartList, cart } = useContext(GlobalContext);
  const [isAdded, setIsAdded] = useState(
    cart.findIndex((c) => c.id === itemId) > -1
  );

  return (
    <div className="item-detail-container">
      <Link to="/"> &#8592; Back</Link>
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={item.image} alt={"Item image"} />
        </div>
        <div className="item-detail-info">
          <div className="item-brand" style={{ margin: "0px 10px" }}>
            {item.brand}
          </div>
          <div className="item-name">{item.name}</div>
          <div className="item-price">${item.price}</div>

          <select className="item-size">
            <option value={"S"}> Select size (S)</option>
            <option value={"M"}> Select size (M)</option>
            <option value={"L"}> Select size (L)</option>
            <option value={"XL"}> Select size (XL)</option>
          </select>
          <button
            className="item-btn"
            disabled={isAdded}
            onClick={() => {
              addItemToCartList(item);
              setIsAdded(true);
            }}
          >
            {isAdded ? <Link to="/cart">Go to Cart</Link> : "Add To bag"}
          </button>
          <p className="item-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
```

</details>

<details>
<summary >9. Cart.js</summary>

```js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Cart.css";

function Cart() {
  const { cart } = useContext(GlobalContext);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {!cart.length ? (
        <p>No Item Added! Please add something to your cart</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-price">{item.price}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-expectedDelivery">
                  (Expected Delivery 3 - 6 days)
                </div>
              </div>
            ))}
          </div>
          <Link to="/checkout">
            <button className="item-btn">Next</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
```

</details>

<details>
<summary >10. Checkout.js</summary>

```js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Checkout.css";

const Checkout = () => {
  const { cart, orders, addItemToOrderList, clearCart } =
    useContext(GlobalContext);
  const { discount, extraFees, tax } = { discount: 20, extraFees: 99, tax: 5 };
  const subTotal = Math.floor(cart?.reduce((sum, curr) => sum + curr.price, 0));
  const total = Math.floor(subTotal + 99 + 5 - (subTotal + 99 + 5) * 0.2);
  const [isOrdered, setIsOrdered] = useState(false);
  const handlePay = () => {
    addItemToOrderList({
      orderId: orders.length + 1,
      buyerId: 1,
      items: [...cart],
      price: total,
      address: "7 Rusk Court",
      deliveryDate: "11/28/2022",
      isDelivered: false,
    });
    clearCart();
    setIsOrdered(true);
  };
  return (
    <div className="checkout-container">
      {isOrdered ? (
        <h3>
          Yay! 🚀 Order placed successfully. <Link to="/">Shop more!</Link>
        </h3>
      ) : (
        <>
          <div>
            <div className="custom-row">
              <h4>Order Review</h4>
              <span>{cart?.length} items in cart</span>
            </div>
            <div className="custom-row">
              <h4>Coupons</h4>
              <span>Not Available</span>
            </div>
            <div className="custom-row">
              <h4>Checkout Summary</h4>
              <div className="checkout-summary">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </div>
              <div className="checkout-summary">
                <span>Discount</span>
                <span>{discount}%</span>
              </div>
              <div className="checkout-summary">
                <span>Extra Fee</span>
                <span>${extraFees}</span>
              </div>
              <div className="checkout-summary">
                <span>Tax</span>
                <span>${tax}</span>
              </div>
            </div>
            <div className="custom-row">
              <h4>Total</h4>
              <span>${total}</span>
            </div>
          </div>
          <button className="item-btn" onClick={handlePay}>
            Pay ${total}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
```

</details>

<details>
<summary >11. Orders.js</summary>

```js
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

function Orders() {
  const { orders } = useContext(GlobalContext);
  return (
    <div className="cart-list">
      {orders.map((order) => (
        <div className="checkout-container" key={order.orderId}>
          <h3>#ID-62Z-{order.orderId}</h3>
          {order.items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-price">${item.price}</div>
              <div className="item-name">{item.name}</div>
              <div className="item-expectedDelivery">
                (Expected cash on delivery 3 - 6 days)
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
```

</details>

<details>
<summary >12. Navbar.js</summary>

```js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
  const { cart } = useContext(GlobalContext);
  return (
    <div className="navbar">
      <Link to="/">
        <h2>shopinn</h2>
      </Link>
      <ul className="navbar-ul">
        <li>Womens</li>
        <li>Mens</li>
        <li>Clothing</li>
        <li>Brands</li>
        <Link to="/cart">
          <li>
            &#128722;{" "}
            <span className="card-count" style={{ color: "red" }}>
              ({cart.length})
            </span>
          </li>
        </Link>
        <Link to="/orders">
          <li>Orders</li>
        </Link>
        <button className="nav-btn">Hi, John</button>
      </ul>
    </div>
  );
};

export default Navbar;
```

</details>
To give you an option to change this project theme/css and to personalize your project in your own way we have skipped the css code as part of this tutorial. However, if you love our UI design you can grab the css code and 'mockData/items.json' from our [GitHub](https://github.com/Vasu7389/react30) repo.  
And after doing all of this, you are done with your own shopping web app.

### Final UI

![](https://firebasestorage.googleapis.com/v0/b/codin-db.appspot.com/o/day9-final.png?alt=media&token=c87a5e6d-3059-4814-b938-e3f4a593f615)

### Share with your friends :)

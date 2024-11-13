import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cancel from "./cancel";
import "./App.css";
// import Success from "./success";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout";
import { useNavigate } from "react-router-dom";
import Success_Image from "./images/71e+QzAKQVL._AC_UY1000_.jpg";
import BuyButton from "./button";

// Use your publishable key here
const stripePromise = loadStripe(
  "pk_test_51NaRZrFqCKOUMOaDzScghtYTMexZnjlIkLVDe6TjTUUOjOBdDXZVE46eYAc6AcdwHh6B5Lxba3iyQfbIs0XdYOpx00y01Zq5Qj"
);

const ProductDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [Productdetails, setProductDetails] = useState({});
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("/create-payment-intent", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
        setProductDetails((prev) => {
          return {
            ...prev,
            product_name: data.product_name,
            product_description: data.product_description,
            product_price: data.product_price,
            product_image: data.product_image,
          };
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPayment(true);
  };
  const appearance = {
    theme: "night",
    variables: {
      fontFamily: "Sohne, system-ui, sans-serif",
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorBackground: "#0A2540",
      colorPrimary: "#EFC078",
      accessibleColorOnColorPrimary: "#1A1B25",
      colorText: "white",
      colorTextSecondary: "white",
      colorTextPlaceholder: "#ABB2BF",
      tabIconColor: "white",
      logoColor: "dark",
    },
    rules: {
      ".Tab": {
        padding: "5px 5px",
        margin: "15px 5px",
      },
      ".Input": {
        backgroundColor: "#212D63",
        border: "1px solid var(--colorPrimary)",
      },
    },
  };
  return (
    <>
      {isPayment ? (
        clientSecret && (
          <section>
            <div className='product row justify-content-between'>
              <img
                className='col-12 col-md-6 img-fluid'
                src={Productdetails.product_image}
                alt='The cover of Stubborn Attachments'
              />
              <div className='description col-12 col-md-6 d-flex gap-2 flex-wrap justify-content-between mt-4'>
                <h1 className='col-12'>Payment Sections: </h1>
                <h3 className='col-12'>
                  Product Name: {Productdetails.product_name}
                </h3>
                <div className='col-12'>
                  <h5>Product Description:</h5>
                  <p>{Productdetails.product_description}</p>
                </div>
                <h5 className='col-12'>
                  Product Price: €{Productdetails.product_price}
                </h5>
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret, appearance }}
                >
                  <CheckoutForm Productdetails={Productdetails} />
                </Elements>
              </div>
            </div>
          </section>
        )
      ) : (
        <>
          <Main
            handleSubmit={handleSubmit}
            ProductDisplay={Productdetails}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

const Main = ({ handleSubmit, ProductDisplay, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className='spinner-wrapper' id='wrapper'>
          <div className='main_spinner' id='main_spinner'></div>
        </div>
      ) : (
        <section>
          <div className='product row justify-content-between'>
            <div className='col-12 col-md-6 overflow-hidden'>
              <img
                className=''
                width='100%'
                height={500}
                src={ProductDisplay.product_image}
                alt='The cover of Stubborn Attachments'
              />
            </div>
            <div className='description col-12 col-md-6 d-flex flex-wrap justify-center mt-4'>
              <h1 className='col-12'>Payment Section: </h1>
              <h3 className='col-12 m-0'>
                Product Name: {ProductDisplay.product_name}
              </h3>
              <div>
                <h5>Product Description:</h5>
                <p>{ProductDisplay.product_description}</p>
              </div>
              <h5 className='col-12'>
                Product Price: €{ProductDisplay.product_price}
              </h5>
              <form onSubmit={handleSubmit}>
                <button type='submit'>Buy Product</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const Success = () => {
  const navigate = useNavigate();

  const MoveToHomes = () => {
    navigate("/checkout");
  };
  return (
    <section>
      <div className='product row'>
        <img
          className='col-12 col-md-6 img-fluid'
          src={Success_Image}
          alt='The cover of Stubborn Attachments'
        />
        <div className='description col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mt-4'>
          <h1>Payment</h1>
          <h1>Success</h1>
          <h2 className='mt-3'>Thank you for your purchase!</h2>
          <BuyButton label='Return to Home' onClick={() => MoveToHomes()} />
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/checkout' element={<ProductDisplay />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </Router>
  );
}

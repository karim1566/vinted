import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const location = useLocation();
  const { title, price, id } = location.state;

  const elements = useElements();
  const stripe = useStripe();

  const handlesumit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      if (token) {
        const stripeResponse = await stripe.createToken(cardElement, {
          name: id,
        });
        const stripeToken = stripeResponse.token.id;

        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/payment",
          {
            token: stripeToken,
            title: title,
            amount: price,
          }
        );
        console.log(response.data);
        if (response.data.status === "succeeded") {
          setIsLoading(false);
          setCompleted(true);
        }
      } else {
        alert("vous devez etre connecter");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fraispa = 0.4;
  const fraisp = 0.8;
  const total = (price + fraisp + fraispa).toFixed(2);
  return (
    <form className="paye" onSubmit={handlesumit}>
      <h3>Résumé de la commande</h3>
      <div className="resum">
        <h3>Commande</h3>
        <h3>{price.toFixed(2)} €</h3>
      </div>
      <div className="resum">
        <h3>frais protection acheteurs</h3>
        <h3>{fraispa.toFixed(2)} €</h3>
      </div>
      <div className="resum border">
        <h3>Frais de port</h3>
        <h3>{fraisp.toFixed(2)} €</h3>
      </div>
      <div className="resum">
        <h3 style={{ color: "black" }}>Total</h3>
        <h3 style={{ color: "black" }}>{total} €</h3>
      </div>
      {}
      <p
        style={{
          margin: "20px",
          fontSize: "17px",
          borderBottom: "1px solid lightgray",
          paddingBottom: "20px",
        }}
      >
        Il ne vous reste plus qu'un étape pour vous offrir <span>{title}</span>{" "}
        Vous allez payer <span>{total}</span> € (frais de protection et frais de
        port inclus).
      </p>
      <CardElement />
      {completed ? (
        <p>payement effectuer et tes marrons dans l'oeuf</p>
      ) : (
        <button
          disabled={isLoading}
          style={{
            backgroundColor: "#04BA6A",
            margin: "30px auto",
            width: "600px",
          }}
          type="submit"
        >
          Payez
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;

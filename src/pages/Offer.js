import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState({});

  const navigate = useNavigate();

  console.log(offer);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setOffer(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="rayon">
      <div className="offre">
        <img
          style={{ overflow: "auto", height: "640px" }}
          src={offer.product_image.secure_url}
          alt=""
        ></img>
      </div>

      <div>
        <div>
          <div className="rayonp">
            <span style={{ fontsize: "18px" }}>{offer.product_price} €</span>
            {offer.product_details.map((item, index) => {
              const key = Object.keys(item);
              console.log(key);
              return (
                <div className="fiche" key={index}>
                  <p>{key} : </p>
                  <p>{item[key]}</p>
                </div>
              );
            })}
            <h4>{offer.product_name}</h4>
            <p style={{ color: "gray", marginBottom: "10px" }}>
              {offer.product_description}
            </p>
            <h4 style={{ border: "none", marginTop: "0px" }}>
              {offer.owner.account.username}
            </h4>

            <button
              className="buy"
              onClick={() => {
                navigate("/payment", {
                  state: {
                    title: offer.product_name,
                    price: offer.product_price,
                    id: offer._id,
                  },
                });
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;

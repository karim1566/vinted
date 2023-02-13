import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState({});

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
        <img src={offer.product_image.secure_url} alt=""></img>
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;

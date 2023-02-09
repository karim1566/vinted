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
    <div>
      <img src={offer.product_image.secure_url} alt=""></img>
      <div>
        <span>{offer.product_price}</span>
        <div className="rayon">
          <div>
            <p>MARQUE</p>
            <p>ÉTAT</p>
            <p>COULEUR</p>
            <p>EMPLACEMENT</p>
          </div>
          <div className="rayonp">
            {offer.product_details.map((item, index) => {
              return (
                <div>
                  <p>{item.MARQUE} </p>
                  <p>{item.ÉTAT} </p>
                  <p>{item.COULEUR} </p>
                  <p>{item.EMPLACEMENT} </p>
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

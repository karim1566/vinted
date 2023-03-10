import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ search, token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <span>en cour de telechargement</span>
  ) : (
    <div>
      <div className="homei">
        <div className="backhome">
          <h1 className="pret">Prêts à faire du tri dans vos placards ?</h1>
          <Link to={token ? "/publish" : "/signup"}>
            <button className="self">Commencez a vendre</button>
          </Link>
        </div>
      </div>
      <div className="articles container">
        {data.offers.map((item) => {
          const id = item._id;
          return (
            <div key={item._id}>
              <div className="lot">
                {item.owner.account.avatar && (
                  <img
                    className="userimage"
                    src={item.owner.account.avatar.url}
                    alt=""
                  />
                )}
                <h5>{item.owner.account.username}</h5>
              </div>
              <Link to={`Offer/${id}`}>
                <div>
                  <img
                    className="articleimg"
                    src={item.product_image.secure_url}
                    alt=""
                  ></img>
                </div>
              </Link>
              <span>{item.product_price} €</span>
              {/* <span>{}</span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

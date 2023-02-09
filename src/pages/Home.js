import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <div>
      <div className="homei">
        <div className="backhome"></div>
      </div>
      <div className="articles container">
        {data.offers.map((item) => {
          const id = item._id;
          return (
            <div key={item._id}>
              <div className="user">
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
                <img
                  className="articleimg"
                  src={item.product_image.secure_url}
                  alt=""
                ></img>
              </Link>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

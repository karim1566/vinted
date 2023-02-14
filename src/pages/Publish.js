import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../composant/Input";
import Addpicture from "../composant/Addpicture";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [Etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [price, setPrice] = useState("");
  // const [change, setChange] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState();

  const navigate = useNavigate();

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", marque);
      formData.append("size", taille);
      formData.append("color", couleur);
      formData.append("condition", Etat);
      formData.append("city", lieu);
      formData.append("price", price);
      // formData.append("", change);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setImageToDisplay(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <form className="container" onSubmit={handlesubmit}>
      <h1>Vends ton articles</h1>
      <div
        className="contpublish"
        style={{
          height: "230px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Addpicture picture={picture} setPicture={setPicture} />
      </div>

      <div className="contpublish">
        <Input title={"Titre"} state={title} setState={setTitle} />
        <Input
          textArea
          title="Décris ton article"
          state={description}
          setState={setDescription}
        />
      </div>
      <div className="contpublish">
        <Input title={"Marque"} state={marque} setState={setMarque} />
        <Input title={"Taille"} state={taille} setState={setTaille} />
        <Input title={"Couleur"} state={couleur} setState={setCouleur} />
        <Input title={"Etat"} state={Etat} setState={setEtat} />
        <Input title={"Lieu"} state={lieu} setState={setLieu} />
      </div>
      <div className="contpublish">
        <Input title={"Prix"} state={price} setState={setPrice} />
      </div>
      <div className="add">
        <button className="ajoutez" type="submit">
          Ajoutez
        </button>
      </div>

      {imageToDisplay && <img src={imageToDisplay.secure_url} alt="" />}
    </form>
  ) : (
    navigate("/")
  );
};
export default Publish;

import { useState } from "react";
import axios from "axios";

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
  const [change, setChange] = useState(false);

  const [imageToDisplay, setImageToDisplay] = useState();

  return (
    <div>
      <form
        className="container"
        onSubmit={async (event) => {
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
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <h1>Vends ton articles</h1>
        <div className="file ">
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          ></input>
        </div>
        <div className="publish">
          <div classeName="ligh">
            <label>Titre</label>
            <input
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              placeholder="ex: chemise Sézane verte"
            ></input>
          </div>
          <div classeName="ligh">
            <label>Décris ton article</label>
            <input
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              type="text"
              placeholder="ex: porté quelque fois, taille correctement"
            ></input>
          </div>
        </div>
        <div className="publish">
          <div classeName="ligh">
            <label>Marque</label>
            <input
              onChange={(event) => {
                setMarque(event.target.value);
              }}
              type="text"
              placeholder="ex:Zara"
            ></input>
          </div>
          <div classeName="ligh">
            <label>Taille</label>
            <input
              onChange={(event) => {
                setTaille(event.target.value);
              }}
              type="text"
              placeholder="ex: L/40/123"
            ></input>
          </div>
          <div classeName="ligh">
            <label>Couleur</label>
            <input
              onChange={(event) => {
                setCouleur(event.target.value);
              }}
              type="text"
              placeholder="ex:Fushia"
            ></input>
          </div>
          <div classeName="ligh">
            <label> Etat</label>
            <input
              onChange={(event) => {
                setEtat(event.target.value);
              }}
              type="text"
              placeholder="ex:Neuf avec étiquette"
            ></input>
          </div>

          <div classeName="ligh">
            <label>Lieu</label>
            <input
              onChange={(event) => {
                setLieu(event.target.value);
              }}
              type="text"
              placeholder="ex: Paris"
            ></input>
          </div>
        </div>
        <div className="publish">
          <label>Prix</label>
          <div classeName="ligh">
            <input
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              type="number"
              placeholder="0,00 €"
            ></input>
            <input
              onChange={(event) => {
                !change ? setChange(true) : setChange(false);
              }}
              type="checkbox"
            ></input>
          </div>
        </div>
        <button type="submit">Ajoutez</button>
      </form>
      {imageToDisplay && <img src={imageToDisplay.secure_url} alt="" />}`
    </div>
  );
};
export default Publish;

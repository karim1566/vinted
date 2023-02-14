const Addpicture = ({ picture, setPicture }) => {
  return (
    <div>
      {picture && (
        <img
          style={{ width: "200px" }}
          src={URL.createObjectURL(picture)}
          alt="product"
        />
      )}
      <label
        htmlFor="file"
        style={{
          color: "#0BB0BA",
          border: "1px solid #0BB0BA",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        + Ajoute une photo
      </label>
      <input
        style={{ display: "none" }}
        id="file"
        type="file"
        onChange={(event) => {
          setPicture(event.target.files[0]);
        }}
      ></input>
    </div>
  );
};
export default Addpicture;

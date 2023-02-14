const Input = ({ title, state, setState, textArea }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <label>{title}</label>
      {textArea ? (
        <textarea
          id={title}
          cols="30"
          rows="10"
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        ></textarea>
      ) : (
        <input
          value={state}
          type="text"
          id={title}
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
      )}
    </div>
  );
};
export default Input;

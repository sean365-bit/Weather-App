import "../styles/Loading.scss";

const Loading = function () {
  return (
    <div className="loading_holder">
      <div className="bouncing_loader">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <p className="loading_text">Loading...</p>
    </div>
  );
};

export default Loading;

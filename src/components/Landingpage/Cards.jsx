import Card from "react-bootstrap/Card";

function BootstrapCard({ data }) {
  return (
    <div
      className="card-container"
      style={{ width: "30rem", backgroundColor: data.bg }}
    >
      <div className="card-img-section">
        <img style={{ width: "5.5rem" }} variant="top" src={data.icon} />
      </div>
      <div className="card-body-content">
        <div className="cardHeader">{data.header}</div>
        <div className="cardContent">{data.content}</div>
      </div>
    </div>
  );
}

export default BootstrapCard;

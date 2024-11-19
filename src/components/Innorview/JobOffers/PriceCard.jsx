import Card from "react-bootstrap/Card";

function PriceCard() {
  const handlePriceClicking = () => {
    console.log("Price clicked");
  };

  return (
    <>
      <div className="price-card-wrapper">
        <div className="header-card">
          <b>
            Monthly <br />
            Subscription
          </b>
        </div>
        <div className="pricing">
          ₹<b className="price-rate">99</b> Month
        </div>
        <div className="plans">
          <ul className="list-parent">
            <li className="plan-option">
              &#x2714; per interview or job application
            </li>
            <li className="plan-option">&#x2714; valid for month</li>
          </ul>
        </div>
        <div className="footer-card">
          <div className="started-button" onClick={() => handlePriceClicking()}>
            Get Started Now
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceCard;

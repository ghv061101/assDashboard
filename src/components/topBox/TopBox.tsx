import "./topbox.scss";
import { topShipDeals } from "../../deals";

const TopBox = () => {
  return (
    <div className="topBox">
      <h1>Top Ship Deals</h1>
      <div className="list">
        {topShipDeals.map((deal) => (
          <div className="listItem" key={deal.id}>
            <div className="user">
              <img src={deal.img} alt={deal.shipName} />
              <div className="userTexts">
                <span className="username">{deal.shipName}</span>
                <span className="email">{deal.producer}</span>
              </div>
            </div>
            <span className="amount">${deal.price}M</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;

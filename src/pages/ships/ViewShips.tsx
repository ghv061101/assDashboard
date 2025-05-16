import { useParams } from 'react-router-dom';
import { db } from '../../db';
import './ships.scss';

const ViewShip = () => {
  const { id } = useParams();
  const ship = db.ships.find(s => s.id === id);

  if (!ship) {
    return <div>Ship not found</div>;
  }

  return (
    <div className="view-ship-container">
      <h2>Ship Details</h2>
      <div className="detail-item"><strong>Name:</strong> {ship.name}</div>
      <div className="detail-item"><strong>IMO Number:</strong> {ship.imo}</div>
      <div className="detail-item"><strong>Flag:</strong> {ship.flag}</div>
      <div className="detail-item"><strong>Status:</strong> {ship.status}</div>
    </div>
  );
};

export default ViewShip;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../db';
import './ships.scss';

interface Ship {
  id: string;
  name: string;
  imo: string;
  flag: string;
  status: string;
}

const Ships = () => {
  const [ships, setShips] = useState<Ship[]>(db.ships);
  const [newShip, setNewShip] = useState<Ship>({
    id: '',
    name: '',
    imo: '',
    flag: '',
    status: 'Active'
  });

  const navigate = useNavigate();

  const handleView = (shipId: string) => {
    navigate(`/ships/${shipId}`);
  };

  const handleDelete = (shipId: string) => {
    const updatedShips = ships.filter(ship => ship.id !== shipId);
    db.ships = updatedShips;
    setShips(updatedShips);
  };

  const handleAddShip = () => {
    if (!newShip.name || !newShip.imo || !newShip.flag || !newShip.status) {
      alert("Please fill all fields.");
      return;
    }
    const id = `s${Date.now()}`; // simple id generator
    const shipToAdd = { ...newShip, id };
    db.ships.push(shipToAdd);
    setShips([...ships, shipToAdd]);
    setNewShip({ id: '', name: '', imo: '', flag: '', status: 'Active' });
  };

  return (
    <div className="ships-container">
      <h2>Ships List</h2>

      <div className="add-ship-form">
        <input
          type="text"
          placeholder="Name"
          value={newShip.name}
          onChange={(e) => setNewShip({ ...newShip, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="IMO Number"
          value={newShip.imo}
          onChange={(e) => setNewShip({ ...newShip, imo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Flag"
          value={newShip.flag}
          onChange={(e) => setNewShip({ ...newShip, flag: e.target.value })}
        />
        <select
          value={newShip.status}
          onChange={(e) => setNewShip({ ...newShip, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Docked">Docked</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        <button onClick={handleAddShip}>Add New Ship</button>
      </div>

      <table className="ships-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO Number</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.imo}</td>
              <td>{ship.flag}</td>
              <td>{ship.status}</td>
              <td>
                <button onClick={() => handleView(ship.id)}>View</button>
                <button onClick={() => handleDelete(ship.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ships;

import { useState } from "react";
import { db } from "../../db";
import { useNavigate } from "react-router-dom";
import "./products.scss";

const Products = () => {
  const [products, setProducts] = useState(db.products);
  const [newProduct, setNewProduct] = useState({
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
    shipId: db.ships[0].id,
  });
  const navigate = useNavigate();

  const handleAdd = () => {
    const productToAdd = {
      id: `c${Date.now()}`,
      ...newProduct,
    };
    const updated = [...products, productToAdd];
    setProducts(updated);
    db.products = updated;

    setNewProduct({
      name: "",
      serialNumber: "",
      installDate: "",
      lastMaintenanceDate: "",
      shipId: db.ships[0].id,
    });
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    db.products = updated;
  };

  const getShipName = (id: string) =>
    db.ships.find((s) => s.id === id)?.name || "Unknown";

  return (
    <div className="products">
      <h2>Ship Components</h2>

      <div className="add-section">
        <input
          type="text"
          placeholder="Component Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Serial No"
          value={newProduct.serialNumber}
          onChange={(e) =>
            setNewProduct({ ...newProduct, serialNumber: e.target.value })
          }
        />
        <input
          type="date"
          value={newProduct.installDate}
          onChange={(e) =>
            setNewProduct({ ...newProduct, installDate: e.target.value })
          }
        />
        <input
          type="date"
          value={newProduct.lastMaintenanceDate}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              lastMaintenanceDate: e.target.value,
            })
          }
        />
        <select
          value={newProduct.shipId}
          onChange={(e) =>
            setNewProduct({ ...newProduct, shipId: e.target.value })
          }
        >
          {db.ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>+ Add Component</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serial</th>
            <th>Installed</th>
            <th>Last Maintenance</th>
            <th>Ship</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.serialNumber}</td>
              <td>{p.installDate}</td>
              <td>{p.lastMaintenanceDate}</td>
              <td>{getShipName(p.shipId)}</td>
              <td>
                <button onClick={() => navigate(`/products/${p.id}`)}>
                  View
                </button>
                <button className="delete" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

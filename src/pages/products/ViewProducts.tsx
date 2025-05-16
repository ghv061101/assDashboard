import { useParams } from "react-router-dom";
import { db } from "../../db";
import "./products.scss";

const ViewProducts = () => {
  const { id } = useParams();
  const product = db.products.find((p) => p.id === id);

  if (!product) return <div>Product not found!</div>;

  const shipName =
    db.ships.find((s) => s.id === product.shipId)?.name || "Unknown";

  return (
    <div className="product-detail">
      <h2>Component Details</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Serial Number:</strong> {product.serialNumber}</p>
      <p><strong>Installed On:</strong> {product.installDate}</p>
      <p><strong>Last Maintenance:</strong> {product.lastMaintenanceDate}</p>
      <p><strong>Installed On Ship:</strong> {shipName}</p>
    </div>
  );
};

export default ViewProducts;

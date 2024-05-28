import React, { useState } from "react";
import axios from "axios";

function ProductForm() {
  const [product, setProduct] = useState({ name: "", description: "", price: "", category: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!product.name || !product.description || !product.price || !product.category) {
      setError("All fields are required.");
      setSuccess(null);  // Clear success message
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5000/addproduct", product);
      console.log("Product created:", response.data);
      setSuccess("Product added successfully!");
      setProduct({ name: "", description: "", price: "", category: "" }); // Reset form
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>Add</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
    </div>
  );
}

export default ProductForm;

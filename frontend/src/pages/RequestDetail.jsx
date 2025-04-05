import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import MobileNavbar from "../components/MobileNavbar.jsx";

const RequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/requests/view/${id}/`)
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching request:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!request) return <p>Request not found.</p>;

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <h2>{request.request_name}</h2>
      <p>Description: {request.description}</p>
      <p>Category: {request.category}</p>
      <p>Condition: {request.condition}</p>
      <p>Max Price: ₹{request.max_price}</p>
      <p>Location: {request.location}</p>
      <p>Urgency: {request.urgency}</p>
      <MobileNavbar />
    </div>
  );
};

export default RequestDetail;
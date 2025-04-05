import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MobileNavbar from "../components/MobileNavbar.jsx";
import api from "../api";

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState("user");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  const tabs = [
    { key: "user", label: "User" },
    { key: "product", label: "Product" },
    { key: "request", label: "Request" },
  ];

  const tabPlaceholders = {
    user: "Search by username...",
    product: "Search by product name...",
    request: "Search by request name...",
  };

  const endpointMap = {
    user: "/api/users/",
    product: "/api/listings/",
    request: "/api/requests/",
  };

  const placeholder = tabPlaceholders[activeTab];

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      setLoading(true);
      const response = await api.get(endpointMap[activeTab], {
        params: { q: searchValue },
      });
      setResults(response.data);
    } catch (error) {
      console.error(`Error fetching ${activeTab} search:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    if (activeTab === "user") {
      navigate(`/user/${id}`); // Placeholder for user detail route
    } else if (activeTab === "product") {
      navigate(`/listings/view/${id}`);
    } else if (activeTab === "request") {
      navigate(`/requests/view/${id}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSearchValue("");
              setResults(null);
              inputRef.current?.focus();
            }}
            style={{
              ...styles.tabButton,
              ...(activeTab === tab.key ? styles.activeTab : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.inputWrapper}>
        <input
          ref={inputRef}
          autoFocus
          type="text"
          name="searchInput"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          🔍
        </button>
      </div>

      {loading && <p style={styles.loadingText}>Searching...</p>}

      {results && (
        <div style={styles.resultsContainer}>
          {results.length === 0 ? (
            <p style={styles.noResults}>No results found.</p>
          ) : (
            results.map((item) => (
              <div key={item.id} style={styles.resultCard}>
                {activeTab === "user" && (
                  <>
                    <p style={styles.resultName}>{item.username}</p>
                    <p style={styles.resultEmail}>{item.email}</p>
                  </>
                )}
                {activeTab === "product" && (
                  <>
                    <p style={styles.resultName}>{item.name}</p>
                    <p style={styles.resultEmail}>Cost: ₹{item.cost}</p>
                  </>
                )}
                {activeTab === "request" && (
                  <>
                    <p style={styles.resultName}>{item.request_name}</p>
                    <p style={styles.resultEmail}>Max Price: ₹{item.max_price}</p>
                  </>
                )}
                <button
                  onClick={() => handleViewDetails(item.id)}
                  style={styles.viewButton}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
      <MobileNavbar />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100vw",
    padding: "0",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    margin: "0",
  },
  tabList: {
    display: "flex",
    margin: "20px 10px",
    border: "1px solid #c5dacd",
    borderRadius: "6px",
    overflow: "hidden",
    backgroundColor: "#f2f9f4",
    width: "calc(100% - 20px)",
  },
  tabButton: {
    flex: 1,
    padding: "12px 0",
    backgroundColor: "#f2f9f4",
    border: "none",
    fontSize: "16px",
    color: "#3d5943",
    cursor: "pointer",
  },
  activeTab: {
    backgroundColor: "#d9e8dc",
    color: "#2f4936",
    fontWeight: "bold",
    borderBottom: "2px solid #5fa86f",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    margin: "18px 10px",
    width: "calc(100% - 20px)",
  },
  input: {
    width: "100%",
    padding: "14px 48px 14px 14px",
    borderRadius: "6px",
    border: "1px solid #b7d2bd",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#f8fbf9",
    boxSizing: "border-box",
  },
  searchButton: {
    position: "absolute",
    right: "10px",
    background: "#5fa86f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "16px",
  },
  loadingText: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  },
  resultsContainer: {
    margin: "20px 10px",
    width: "calc(100% - 20px)",
    flexGrow: 1,
  },
  resultCard: {
    backgroundColor: "#f1f8f3",
    borderRadius: "6px",
    padding: "12px 16px",
    marginBottom: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #d3e7d6",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  resultName: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 4px",
    color: "#2f4936",
  },
  resultEmail: {
    fontSize: "14px",
    margin: "0 0 8px",
    color: "#4f6d58",
  },
  noResults: {
    textAlign: "center",
    color: "#889c91",
    fontSize: "14px",
    marginTop: "10px",
  },
  viewButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
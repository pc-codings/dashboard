import React from "react";
import "./App.css";
import jsonData from './data.json'
import { useState,useEffect } from "react";

const Element = () => {
    const [searchInput, setSearchInput] = useState("");
    const [tab, setTab] = useState("Pending");
    const [filteredData, setFilteredData] = useState([]);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [riskLevel, setRiskLevel] = useState("");

    const [triggerReason, setTriggerReason] = useState("");

    const [closeAccountData, setCloseAccountData] = useState({
      email: "",
      reason: "",
      note: "",
    });
    const usersData = jsonData.data;

    useEffect(() => {
      const filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        (tab === "Pending" ? user.status === "Pending" : user.status === "Completed") &&
        (triggerReason ? user.trigger === triggerReason : true) &&
        (riskLevel ? user.riskLevel === riskLevel : true)
      );
    
      setFilteredData(filteredUsers);
    }, [searchInput, tab, usersData, triggerReason, riskLevel]);
    
    

    const handleOpenCloseModal = () => {
      setShowCloseModal(true);
    };
  
    const handleCloseModal = () => {
      setShowCloseModal(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCloseAccountData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleConfirmClose = () => {
      // Perform close account logic here
      console.log("Closing account with data:", closeAccountData);
  
      // Reset state after closing account
      setCloseAccountData({
        email: "",
        reason: "",
        note: "",
      });
      setShowCloseModal(false);
    };

  return (
    <div className="element" data-color-mode="light">
      <div className="text-wrapper">Monitoring</div>
      <div className="sectional-tab-bar">
        <div className="background-line" />
        <div className="section">
        <div
            className={`div ${tab === "Pending" ? "active" : ""}`}
            onClick={() => setTab("Pending")}
          >
            Pending
          </div>
          <div
            className={`div ${tab === "Completed" ? "active" : ""}`}
            onClick={() => setTab("Completed")}
          >
            Completed
          </div>
        </div>
      </div>
      <div className="frame">
      <div className="frame-2">
          <div className="table-header-cell">
            <div className="content">
              <div className="text-wrapper-2">User</div>
            </div>
          </div>
          {filteredData.map((user) => (
            <div className="table-cell" key={user.id}>
              <div className="frame-3">
                <div className="text-wrapper-3">{user.name}</div>
                <div className="text-wrapper-4">{user.email}</div>
              </div>
              <img
                className="img"
                alt="External link"
                src="https://c.animaapp.com/McviV3R7/img/external-link-5.svg"
              />
            </div>
          ))}
        </div>

        {/* Risk Management */}
        <div className="frame-4">
          <div className="table-header-cell-2">
            <div className="content">
              <div className="text-wrapper-2">Risk level</div>
            </div>
            <img
              className="img"
              alt="Chevrons up down"
              src="https://c.animaapp.com/McviV3R7/img/chevrons-up-down-2.svg"
            />
          </div>
          {filteredData.map((user) => (
            <div className="table-cell-3" key={user.id}>
              <div className={`ellipse ellipse-${user.riskLevel.toLowerCase()}`} />
              <div className="text-wrapper-5">{user.riskLevel}</div>
            </div>
          ))}
        </div>
        {/* ------- */}

        {/* Trigger data */}
        <div className="frame-5">
            <div className="table-header-cell-2">
                <div className="content">
                    <div className="text-wrapper-2">Trigger reason</div>
                </div>
                </div>
                {filteredData.map((user, index) => (
                <div className="div-wrapper" key={index}>
                    <div className="text-wrapper-8">{user.trigger}</div>
                </div>
            ))}
        </div>
{/* -------------------------------- */}


        <div className="frame-6">
            <div className="table-header-cell-2">
                <div className="content">
                <div className="text-wrapper-2">In queue for</div>
                </div>
                <img
                className="img"
                alt="Chevrons up down"
                src="https://c.animaapp.com/McviV3R7/img/chevrons-up-down-2.svg"
                />
            </div>
            {filteredData.map((days, index) => (
                <div key={index} className="table-cell-4">
                <div className="frame-3">
                    <div className="text-wrapper-9">{days.inQueueFor}</div>
                </div>
                </div>
            ))}
        </div>

        <div className="frame-7">
      <div className="table-header-cell-2">
        <div className="content">
          <div className="text-wrapper-2">Date added on</div>
        </div>
        <img
          className="img"
          alt="Chevrons up down"
          src="https://c.animaapp.com/McviV3R7/img/chevrons-up-down-2.svg"
        />
      </div>

      {filteredData.map((user) => (
        <div key={user.id} className="table-cell-4">
          <div className="text-wrapper-10">{user.date}</div>
        </div>
      ))}
    </div>
    <div className="frame-7">
      <div className="table-header-cell-2">
        <div className="content">
          <div className="text-wrapper-2">Previously reviewed</div>
        </div>
      </div>

      {filteredData.map((item, index) => (
        <div className="table-cell-5" key={index}>
          <div className="frame-3">
            <div className="text-wrapper-9">{item.status}</div>
            {item.date && (
              <div>
                {tab === "Completed" && <div className="text-wrapper-4">{item.remail}</div>}
                <div className="text-wrapper-4">{item.previouslyReviewed}</div>
              </div>
            )}
          </div>
        </div>
      ))}
  </div>

      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="button">
          <img className="img" alt="Search" src="https://c.animaapp.com/McviV3R7/img/search.svg" />
          <div className="div-2">
            
            <input
            className="hero"
          type="text"
          placeholder="Search by user name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
           
          </div>
        </button>
      </div>
      <div className="frame-wrapper">
      <div className="frame-8">
        <div className="label"></div>
        <select
          className="trigger-dropdown" // Add this class
          onChange={(e) => setTriggerReason(e.target.value)}
          >
          <option value="">Trigger</option>
          <option value="FIFO">FIFO</option>
          <option value="IP Change">IP Change</option>
          <option value="TRFO">TRFO</option>
        </select>
      </div>
    </div>

      <div className="frame-9">
      <div className="frame-8">
        
        <select
          className="risk-level-dropdown" 
          onChange={(e) => setRiskLevel(e.target.value)}
        >
          <option value="">Risk Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      </div>
      <div className="overlap-group">
        <div className="sidepanel">
          <div className="frame-10">
            <img className="image" alt="Image" src="https://c.animaapp.com/McviV3R7/img/image-1-1@2x.png" />
            <div className="frame-11">
              <div className="div-wrapper-2">
                <div className="text-wrapper-13">Overview</div>
              </div>
              <div className="div-wrapper-2">
                <div className="text-wrapper-13">Onboarding</div>
              </div>
              <div className="home">
                <div className="text-wrapper-14">Monitoring</div>
              </div>
              <div className="div-wrapper-2">
                <div className="text-wrapper-15">Flagging</div>
              </div>
              <div className="div-wrapper-2">
                <div className="text-wrapper-13">Source of Income</div>
              </div>
              <div className="div-wrapper-2">
                <div className="text-wrapper-13">UAR</div>
              </div>
            </div>
          </div>
          <div className="avatar-text-wrapper">
            <div className="div-2">
              <div className="avatar" />
              <div className="text">
                <div className="text-wrapper-3">Elon Musk</div>
                <div className="text-wrapper-16">elon@twitter.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCloseModal && (
        <div className="close-modal">
          <div className="close-modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p className="hero-close">Close Account</p>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={closeAccountData.email}
              onChange={handleInputChange}
            />
            <div className="hero-radio">
            <label className="hero-line">file UAR</label>
            <input type="radio" value="Male" name="gender" /> Yes
            <input type="radio" value="Female" name="gender" /> No
            </div>
            <label>Reason:</label>
            <select
              name="reason"
              value={closeAccountData.reason}
              onChange={handleInputChange}
            >
              <option value="">Select reason</option>
              <option value="reason1">Reason 1</option>
              <option value="reason2">Reason 2</option>
              {/* Add more options as needed */}
            </select>
            <label>Note:</label>
            <textarea
              name="note"
              value={closeAccountData.note}
              onChange={handleInputChange}
            />
            <button onClick={handleConfirmClose}>Confirm</button>
          </div>
        </div>
      )}
      <div className="frame-12">
        <img className="img" alt="X circle" src="https://c.animaapp.com/McviV3R7/img/x-circle.svg" />
        <button onClick={handleOpenCloseModal}>
          <div >Close account</div>
        </button>
      </div>
    </div>
  );
};

export default Element;
import { useState } from "react";
import "../pagescss/employeepage.css";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [leaveRequest, setLeaveRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const [leaveHistory, setLeaveHistory] = useState([
    { id: 1, type: "Vacation", startDate: "2023-06-15", endDate: "2023-06-20", status: "Approved", reason: "Family vacation" },
    { id: 2, type: "Sick Leave", startDate: "2023-08-10", endDate: "2023-08-12", status: "Approved", reason: "Medical appointment" }
  ]);
  const [payrollHistory, setPayrollHistory] = useState([
    { id: 1, month: "October 2023", salary: "$5,000", status: "Paid", payslip: "View" },
    { id: 2, month: "September 2023", salary: "$5,000", status: "Paid", payslip: "View" },
    { id: 3, month: "August 2023", salary: "$4,800", status: "Paid", payslip: "View" }
  ]);
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john@company.com",
    phone: "555-1234",
    address: "123 Main St, City, State",
    emergencyContact: "Jane Doe (555-9876)"
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes for leave request form
  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest({ ...leaveRequest, [name]: value });
  };

  // Handle input changes for personal info form
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  // Submit leave request
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    const newLeaveRequest = {
      id: leaveHistory.length + 1,
      type: leaveRequest.type,
      startDate: leaveRequest.startDate,
      endDate: leaveRequest.endDate,
      status: "Pending",
      reason: leaveRequest.reason
    };
    
    setLeaveHistory([...leaveHistory, newLeaveRequest]);
    setLeaveRequest({ type: "", startDate: "", endDate: "", reason: "" });
    alert("Leave request submitted successfully!");
  };

  // Submit updated personal info
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Personal information updated successfully!");
  };

  return (
    <div className="employee-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <i className="fas fa-user"></i>
          <h2>Employee Portal</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <i className="fas fa-th-large"></i> Dashboard
          </li>
          <li className={activeTab === "leaves" ? "active" : ""} onClick={() => setActiveTab("leaves")}>
            <i className="fas fa-calendar-day"></i> Leave Management
          </li>
          <li className={activeTab === "payroll" ? "active" : ""} onClick={() => setActiveTab("payroll")}>
            <i className="fas fa-money-bill-wave"></i> Payroll
          </li>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            <i className="fas fa-user-cog"></i> Profile
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-details">
              <h4>John Doe</h4>
              <p>Software Developer</p>
            </div>
          </div>
          <button className="logout-btn" onClick={() => window.location.href = "/"}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="content-header">
          <h1>
            {activeTab === "dashboard" && "Employee Dashboard"}
            {activeTab === "leaves" && "Leave Management"}
            {activeTab === "payroll" && "Payroll Information"}
            {activeTab === "profile" && "Personal Profile"}
          </h1>
          <div className="header-actions">
            <div className="notifications">
              <i className="fas fa-bell"></i>
              <span className="badge">2</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <div className="welcome-card">
              <h2>Welcome, John Doe!</h2>
              <p>Here's a quick overview of your information</p>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-info">
                  <h3>12</h3>
                  <p>Leave Days Available</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-times"></i>
                </div>
                <div className="stat-info">
                  <h3>2</h3>
                  <p>Pending Leave Requests</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <div className="stat-info">
                  <h3>$5,000</h3>
                  <p>Current Salary</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => setActiveTab("leaves")}>
                  <i className="fas fa-calendar-plus"></i>
                  <span>Apply for Leave</span>
                </button>
                <button className="action-btn" onClick={() => setActiveTab("payroll")}>
                  <i className="fas fa-file-invoice-dollar"></i>
                  <span>View Payslips</span>
                </button>
                <button className="action-btn" onClick={() => setActiveTab("profile")}>
                  <i className="fas fa-user-edit"></i>
                  <span>Update Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leave Management */}
        {activeTab === "leaves" && (
          <div className="leave-content">
            <div className="content-section">
              <h2>Apply for Leave</h2>
              <form onSubmit={handleLeaveSubmit} className="leave-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Leave Type</label>
                    <select name="type" value={leaveRequest.type} onChange={handleLeaveInputChange} required>
                      <option value="">Select Leave Type</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal">Personal</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" name="startDate" value={leaveRequest.startDate} onChange={handleLeaveInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" name="endDate" value={leaveRequest.endDate} onChange={handleLeaveInputChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Reason</label>
                    <textarea name="reason" value={leaveRequest.reason} onChange={handleLeaveInputChange} required />
                  </div>
                </div>
                <button type="submit" className="submit-btn">Submit Leave Request</button>
              </form>
            </div>

            <div className="content-section">
              <h2>Leave History</h2>
              <div className="leave-history">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveHistory.map(leave => (
                      <tr key={leave.id}>
                        <td>{leave.type}</td>
                        <td>{leave.startDate}</td>
                        <td>{leave.endDate}</td>
                        <td>{leave.reason}</td>
                        <td>
                          <span className={`status-badge ${leave.status.toLowerCase()}`}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Information */}
        {activeTab === "payroll" && (
          <div className="payroll-content">
            <div className="content-section">
              <h2>Payroll History</h2>
              <div className="payroll-history">
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Salary</th>
                      <th>Status</th>
                      <th>Payslip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollHistory.map(payroll => (
                      <tr key={payroll.id}>
                        <td>{payroll.month}</td>
                        <td>{payroll.salary}</td>
                        <td>
                          <span className={`status-badge ${payroll.status.toLowerCase()}`}>
                            {payroll.status}
                          </span>
                        </td>
                        <td>
                          <button className="view-btn">
                            <i className="fas fa-download"></i> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Profile Management */}
        {activeTab === "profile" && (
          <div className="profile-content">
            <div className="content-section">
              <h2>Personal Information</h2>
              <form onSubmit={handlePersonalInfoSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={personalInfo.name} 
                      onChange={handlePersonalInfoChange} 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={personalInfo.email} 
                      onChange={handlePersonalInfoChange} 
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={personalInfo.phone} 
                      onChange={handlePersonalInfoChange} 
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea 
                      name="address" 
                      value={personalInfo.address} 
                      onChange={handlePersonalInfoChange} 
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Emergency Contact</label>
                    <input 
                      type="text" 
                      name="emergencyContact" 
                      value={personalInfo.emergencyContact} 
                      onChange={handlePersonalInfoChange} 
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing ? (
                  <div className="form-actions">
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit">Save Changes</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">
                    <i className="fas fa-edit"></i> Edit Information
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
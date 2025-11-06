import { useState } from "react";
import "../pagescss/hrpage.css";

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", department: "Engineering", position: "Software Developer", status: "Active", joinDate: "2023-01-15", email: "john@company.com" },
    { id: 3, name: "Robert Johnson", department: "Marketing", position: "Marketing Specialist", status: "On Leave", joinDate: "2023-03-10", email: "robert@company.com" },
    { id: 4, name: "Emily Davis", department: "Finance", position: "Financial Analyst", status: "Active", joinDate: "2022-11-05", email: "emily@company.com" },
    { id: 5, name: "Michael Wilson", department: "Engineering", position: "QA Engineer", status: "Active", joinDate: "2023-05-22", email: "michael@company.com" }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: "John Doe", type: "Vacation", startDate: "2023-11-15", endDate: "2023-11-20", status: "Pending", reason: "Family vacation" },
    { id: 2, employee: "Emily Davis", type: "Sick Leave", startDate: "2023-11-10", endDate: "2023-11-12", status: "Approved", reason: "Medical appointment" },
    { id: 3, employee: "Michael Wilson", type: "Personal", startDate: "2023-11-25", endDate: "2023-11-27", status: "Pending", reason: "Personal matters" }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, employee: "John Doe", date: "2023-11-01", status: "Present", checkIn: "09:05", checkOut: "17:30" },
    { id: 2, employee: "Emily Davis", date: "2023-11-01", status: "Present", checkIn: "08:55", checkOut: "17:25" },
    { id: 3, employee: "Robert Johnson", date: "2023-11-01", status: "Absent", checkIn: "-", checkOut: "-" },
    { id: 4, employee: "Michael Wilson", date: "2023-11-01", status: "Present", checkIn: "09:10", checkOut: "17:45" }
  ]);

  // Stats data
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.status === "Active").length,
    onLeave: employees.filter(emp => emp.status === "On Leave").length,
    departments: [...new Set(employees.map(emp => emp.department))].length,
    pendingLeaves: leaveRequests.filter(req => req.status === "Pending").length
  };

  // Handle leave request decision
  const handleLeaveDecision = (id, decision) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id ? {...request, status: decision} : request
    ));
  };

  // Update employee role
  const handleUpdateRole = (id, newPosition) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? {...employee, position: newPosition} : employee
    ));
  };

  return (
    <div className="hr-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <i className="fas fa-user-tie"></i>
          <h2>HR Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
            <i className="fas fa-th-large"></i> Overview
          </li>
          <li className={activeTab === "employees" ? "active" : ""} onClick={() => setActiveTab("employees")}>
            <i className="fas fa-users"></i> Employees
          </li>
          <li className={activeTab === "attendance" ? "active" : ""} onClick={() => setActiveTab("attendance")}>
            <i className="fas fa-calendar-check"></i> Attendance
          </li>
          <li className={activeTab === "leaves" ? "active" : ""} onClick={() => setActiveTab("leaves")}>
            <i className="fas fa-calendar-day"></i> Leave Requests
          </li>
          <li className={activeTab === "payroll" ? "active" : ""} onClick={() => setActiveTab("payroll")}>
            <i className="fas fa-money-bill-wave"></i> Payroll
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="user-details">
              <h4>HR Manager</h4>
              <p>admin@company.com</p>
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
            {activeTab === "overview" && "HR Overview"}
            {activeTab === "employees" && "Employee Management"}
            {activeTab === "attendance" && "Attendance Records"}
            {activeTab === "leaves" && "Leave Management"}
            {activeTab === "payroll" && "Payroll Management"}
          </h1>
          <div className="header-actions">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search..." />
            </div>
            <div className="notifications">
              <i className="fas fa-bell"></i>
              <span className="badge">{leaveRequests.filter(req => req.status === "Pending").length}</span>
            </div>
          </div>
        </div>

        {/* Overview Content */}
        {activeTab === "overview" && (
          <div className="dashboard-content">
            {/* Stats Cards */}
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.totalEmployees}</h3>
                  <p>Total Employees</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.activeEmployees}</h3>
                  <p>Active Employees</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-minus"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.onLeave}</h3>
                  <p>On Leave</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.departments}</h3>
                  <p>Departments</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.pendingLeaves}</h3>
                  <p>Pending Leaves</p>
                </div>
              </div>
            </div>

            {/* Pending Actions */}
            <div className="pending-actions">
              <h2>Pending Actions</h2>
              <div className="action-cards">
                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-calendar-day"></i>
                  </div>
                  <div className="action-details">
                    <h3>{leaveRequests.filter(req => req.status === "Pending").length}</h3>
                    <p>Pending Leave Requests</p>
                    <button onClick={() => setActiveTab("leaves")}>Review Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employees Management */}
        {activeTab === "employees" && (
          <div className="employees-content">
            <div className="content-header">
              <h2>Employee Directory</h2>
            </div>

            {/* Employees Table */}
            <div className="employees-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>
                        <div className="employee-info">
                          <div className="avatar">
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <div className="name">{employee.name}</div>
                            <div className="email">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{employee.department}</td>
                      <td>
                        <select 
                          value={employee.position} 
                          onChange={(e) => handleUpdateRole(employee.id, e.target.value)}
                        >
                          <option value="Software Developer">Software Developer</option>
                          <option value="Senior Developer">Senior Developer</option>
                          <option value="Team Lead">Team Lead</option>
                          <option value="QA Engineer">QA Engineer</option>
                          <option value="Marketing Specialist">Marketing Specialist</option>
                          <option value="Financial Analyst">Financial Analyst</option>
                        </select>
                      </td>
                      <td>
                        <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td>{employee.joinDate}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view" title="View">
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leave Management */}
        {activeTab === "leaves" && (
          <div className="leave-content">
            <div className="content-header">
              <h2>Leave Management</h2>
              <div className="filter-options">
                <select>
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="leave-stats">
              <div className="leave-stat">
                <span className="stat-count">{leaveRequests.length}</span>
                <span className="stat-label">Total Requests</span>
              </div>
              <div className="leave-stat">
                <span className="stat-count">{leaveRequests.filter(req => req.status === "Pending").length}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="leave-stat">
                <span className="stat-count">{leaveRequests.filter(req => req.status === "Approved").length}</span>
                <span className="stat-label">Approved</span>
              </div>
              <div className="leave-stat">
                <span className="stat-count">{leaveRequests.filter(req => req.status === "Rejected").length}</span>
                <span className="stat-label">Rejected</span>
              </div>
            </div>
            
            <div className="leave-requests">
              <h3>Recent Leave Requests</h3>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map(request => (
                    <tr key={request.id}>
                      <td>{request.employee}</td>
                      <td>{request.type}</td>
                      <td>{request.startDate}</td>
                      <td>{request.endDate}</td>
                      <td>{request.reason}</td>
                      <td>
                        <span className={`status-badge ${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>
                        {request.status === "Pending" && (
                          <div className="action-buttons">
                            <button className="action-btn approve" onClick={() => handleLeaveDecision(request.id, "Approved")}>
                              <i className="fas fa-check"></i> Approve
                            </button>
                            <button className="action-btn reject" onClick={() => handleLeaveDecision(request.id, "Rejected")}>
                              <i className="fas fa-times"></i> Reject
                            </button>
                          </div>
                        )}
                        {request.status !== "Pending" && (
                          <span className="processed-text">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Management */}
        {activeTab === "attendance" && (
          <div className="attendance-content">
            <div className="content-header">
              <h2>Attendance Records</h2>
              <div className="filter-options">
                <select>
                  <option>November 2023</option>
                  <option>October 2023</option>
                  <option>September 2023</option>
                </select>
              </div>
            </div>
            
            <div className="attendance-table">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map(record => (
                    <tr key={record.id}>
                      <td>{record.employee}</td>
                      <td>{record.date}</td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{record.checkIn}</td>
                      <td>{record.checkOut}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other sections would go here */}
        {activeTab === "payroll" && (
          <div className="tab-content">
            <h2>Payroll Management</h2>
            <p>This section contains payroll management features.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
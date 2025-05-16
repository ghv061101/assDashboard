import "./home.scss";
import { db } from "../../db";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Home = () => {
  // Process Ships by Status
  const shipsByStatus = db.ships.reduce((acc, ship) => {
    acc[ship.status] = (acc[ship.status] || 0) + 1;
    return acc;
  }, {});

  const shipStatusData = Object.entries(shipsByStatus).map(([status, count]) => ({
    status,
    count,
  }));

  // Process Jobs by Status
  const jobsByStatus = db.jobs.reduce((acc: { [key: string]: number }, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const jobStatusData = Object.entries(jobsByStatus).map(([status, count]) => ({
    status,
    count,
  }));

  // Process Jobs by Priority
  const jobsByPriority = db.jobs.reduce((acc, job) => {
    acc[job.priority] = (acc[job.priority] || 0) + 1;
    return acc;
  }, {});

  const jobPriorityData = Object.entries(jobsByPriority).map(([priority, count]) => ({
    priority,
    count,
  }));

  // Process Users by Role
  const usersByRole = db.users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const userRoleData = Object.entries(usersByRole).map(([role, count]) => ({
    role,
    count,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="home">
      <h2>Ship Management Dashboard</h2>

      <div className="charts-container">

        {/* Ships by Status */}
        <div className="chart-card">
          <h3>Ships by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={shipStatusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {shipStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Jobs by Status */}
        <div className="chart-card">
          <h3>Jobs by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobStatusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Jobs by Priority */}
        <div className="chart-card">
          <h3>Jobs by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobPriorityData}>
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Role */}
        <div className="chart-card">
          <h3>Users by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoleData}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {userRoleData.map((entry, index) => (
                  <Cell key={`cell-user-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Home;

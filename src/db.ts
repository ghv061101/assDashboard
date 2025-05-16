import { Component } from "react";

export const db = {
  users: [
    {
      id: "u1",
      name: "Harsha",
      email: "harsha@example.com",
      role: "Engineer",
    },
    {
      id: "u2",
      name: "Ananya",
      email: "ananya@example.com",
      role: "Engineer",
    },
  ],

  jobs: [
    {
      id: "j1",
      type: "Inspection",
      shipId: "s1",
      priority: "High",
      status: "Open",
      scheduledDate: "2025-05-18",
      assignedEngineerId: "",
      applicants: [],
    },
    // more jobs...
  ],

  ships: [
    {
      id: "s1",
      name: "INS Vikrant",
      type: "Carrier",
      status: "Active",
    },
    {
      id: "s2",
      name: "INS Kolkata",
      type: "Destroyer",
      status: "Docked",
    },
  ],
  Components:[
    {
        id:'c1',
        name:
    }
  ]
};

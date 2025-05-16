export const db={
  "users": [
    { "id": "1", "role": "Admin", "email": "admin@entnt.in", "password": "admin123" },
    { "id": "2", "role": "Inspector", "email": "inspector@entnt.in", "password": "inspect123" },
    { "id": "3", "role": "Engineer", "email": "engineer@entnt.in", "password": "engine123" },
    { "id": "4", "role": "Engineer", "email": "harsha@entnt.in", "password": "pass123" },
    { "id": "5", "role": "Inspector", "email": "ananya@entnt.in", "password": "pass456" },
    { "id": "6", "role": "Engineer", "email": "rohan@entnt.in", "password": "pass789" },
    { "id": "7", "role": "Inspector", "email": "vikas@entnt.in", "password": "pass101" },
    { "id": "8", "role": "Engineer", "email": "megha@entnt.in", "password": "pass202" },
    { "id": "9", "role": "user", "email": "shivani@gmail.com", "password": "pass303" },
    { "id": "10", "role": "Engineer", "email": "ajay@entnt.in", "password": "pass404" },

  ],
  "ships": [
    { "id": "s1", "name": "Ever Given", "imo": "9811000", "flag": "Panama", "status": "Active" },
    { "id": "s2", "name": "Maersk Alabama", "imo": "9164263", "flag": "USA", "status": "Under Maintenance" },
    { "id": "s3", "name": "Titanic II", "imo": "1234567", "flag": "UK", "status": "Active" },
    { "id": "s4", "name": "Poseidon", "imo": "7654321", "flag": "Greece", "status": "Docked" },
    { "id": "s5", "name": "Black Pearl", "imo": "9876543", "flag": "Bahamas", "status": "Active" },
    { "id": "s6", "name": "Queen Mary", "imo": "1122334", "flag": "UK", "status": "Under Maintenance" },
    { "id": "s7", "name": "Sea Explorer", "imo": "5566778", "flag": "Norway", "status": "Active" },
    { "id": "s8", "name": "Marine King", "imo": "7788990", "flag": "India", "status": "Active" },
    { "id": "s9", "name": "Ocean Star", "imo": "3344556", "flag": "Japan", "status": "Docked" },
    { "id": "s10", "name": "Wave Rider", "imo": "9900112", "flag": "USA", "status": "Active" }
  ],
  "products": [
    { "id": "c1", "shipId": "s1", "name": "Main Engine", "serialNumber": "ME-1234", "installDate": "2020-01-10", "lastMaintenanceDate": "2024-03-12" },
    { "id": "c2", "shipId": "s2", "name": "Radar", "serialNumber": "RAD-5678", "installDate": "2021-07-18", "lastMaintenanceDate": "2023-12-01" },
    { "id": "c3", "shipId": "s3", "name": "Fuel Pump", "serialNumber": "FP-3344", "installDate": "2019-05-15", "lastMaintenanceDate": "2024-01-10" },
    { "id": "c4", "shipId": "s4", "name": "Cooling System", "serialNumber": "CS-5566", "installDate": "2018-11-20", "lastMaintenanceDate": "2023-10-08" },
    { "id": "c5", "shipId": "s5", "name": "Navigation System", "serialNumber": "NS-7788", "installDate": "2022-03-03", "lastMaintenanceDate": "2024-04-01" },
    { "id": "c6", "shipId": "s6", "name": "Anchor Winch", "serialNumber": "AW-9911", "installDate": "2021-12-12", "lastMaintenanceDate": "2023-12-22" },
    { "id": "c7", "shipId": "s7", "name": "Emergency Generator", "serialNumber": "EG-1122", "installDate": "2020-06-25", "lastMaintenanceDate": "2023-06-15" },
    { "id": "c8", "shipId": "s8", "name": "Air Conditioning", "serialNumber": "AC-2233", "installDate": "2023-01-05", "lastMaintenanceDate": "2024-01-28" },
    { "id": "c9", "shipId": "s9", "name": "Fire Pump", "serialNumber": "FP-4455", "installDate": "2019-09-09", "lastMaintenanceDate": "2024-02-02" },
    { "id": "c10", "shipId": "s10", "name": "Propeller Shaft", "serialNumber": "PS-6677", "installDate": "2022-07-17", "lastMaintenanceDate": "2024-03-03" }
  ],
  "jobs": [
    { "id": "j1", "componentId": "c1", "shipId": "s1", "type": "Inspection", "priority": "High", "status": "Open", "assignedEngineerId": "3", "scheduledDate": "2025-05-05" },
    { "id": "j2", "componentId": "c2", "shipId": "s2", "type": "Repair", "priority": "Critical", "status": "Scheduled", "assignedEngineerId": "6", "scheduledDate": "2025-05-08" },
    { "id": "j3", "componentId": "c3", "shipId": "s3", "type": "Maintenance", "priority": "Medium", "status": "In Progress", "assignedEngineerId": "4", "scheduledDate": "2025-05-10" },
    { "id": "j4", "componentId": "c4", "shipId": "s4", "type": "Inspection", "priority": "Low", "status": "Open", "assignedEngineerId": "5", "scheduledDate": "2025-05-12" },
    { "id": "j5", "componentId": "c5", "shipId": "s5", "type": "Upgrade", "priority": "High", "status": "Scheduled", "assignedEngineerId": "8", "scheduledDate": "2025-05-15" },
    { "id": "j6", "componentId": "c6", "shipId": "s6", "type": "Repair", "priority": "Critical", "status": "Open", "assignedEngineerId": "2", "scheduledDate": "2025-05-18" },
    { "id": "j7", "componentId": "c7", "shipId": "s7", "type": "Inspection", "priority": "Medium", "status": "Scheduled", "assignedEngineerId": "7", "scheduledDate": "2025-05-20" },
    { "id": "j8", "componentId": "c8", "shipId": "s8", "type": "Testing", "priority": "High", "status": "Open", "assignedEngineerId": "9", "scheduledDate": "2025-05-22" },
    { "id": "j9", "componentId": "c9", "shipId": "s9", "type": "Maintenance", "priority": "Low", "status": "In Progress", "assignedEngineerId": "10", "scheduledDate": "2025-05-25" },
    { "id": "j10", "componentId": "c10", "shipId": "s10", "type": "Repair", "priority": "Medium", "status": "Scheduled", "assignedEngineerId": "3", "scheduledDate": "2025-05-28" }
  ]
};

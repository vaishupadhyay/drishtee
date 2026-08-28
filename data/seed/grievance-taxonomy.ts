export interface GrievanceCategory {
  ministryOrBody: string;
  department: string;
  services: string[];
}

export interface ServicePointCandidate {
  id: string;
  name: string;
  department: string;
  address: string;
  distanceM: number;
  confidence: number;
  category: string;
}

export const grievanceTaxonomy: GrievanceCategory[] = [
  { ministryOrBody: "Revenue Department", department: "Local Revenue Services", services: ["Land record correction", "Certificate delay", "Registration delay", "Revenue court matter", "Others / Miscellaneous"] },
  { ministryOrBody: "Health Department", department: "Public Health Services", services: ["Medicine unavailability", "Doctor absence", "OPD wait time", "Cleanliness", "Staff behaviour", "Ambulance service", "Others / Miscellaneous"] },
  { ministryOrBody: "Food & Civil Supplies Department", department: "Fair-Price Services", services: ["Ration not issued", "Quantity shortfall", "Shop closed on schedule", "Overcharging", "Card-linking issue", "Others / Miscellaneous"] },
  { ministryOrBody: "Transport Department", department: "Road Transport Services", services: ["Licence delay", "Registration delay", "Fitness certificate", "Permit issue", "Others / Miscellaneous"] },
  { ministryOrBody: "Electricity Board", department: "Electricity Services", services: ["Outage not restored", "Billing error", "Meter fault", "New connection delay", "Others / Miscellaneous"] },
  { ministryOrBody: "Municipal / Panchayat", department: "Civic Services", services: ["Sanitation not collected", "Streetlight not working", "Water supply disruption", "Drainage", "Encroachment", "Others / Miscellaneous"] },
  { ministryOrBody: "Water Resources / Public Works", department: "Public Utility Services", services: ["Broken road", "Water supply infrastructure", "Public tap not working", "Others / Miscellaneous"] },
  { ministryOrBody: "Police Department", department: "Police Station Services", services: ["Report registration delay", "Complaint not registered", "Staff behaviour", "Others / Miscellaneous"] },
  { ministryOrBody: "Education Department", department: "Government School Services", services: ["Infrastructure", "Midday meal", "Teacher absence", "Fee irregularity", "Others / Miscellaneous"] },
  { ministryOrBody: "Transport Corporation", department: "Bus Service", services: ["Service not running on schedule", "Overcrowding", "Staff behaviour", "Fare irregularity", "Others / Miscellaneous"] },
];

export const locationCandidates: ServicePointCandidate[] = [
  { id: "TN-CBE-HEALTH-PHARM-002", name: "Government Hospital Pharmacy", department: "Public Health Services", address: "Gandhipuram, Coimbatore", distanceM: 42, confidence: 96, category: "Hospital pharmacy counter" },
  { id: "TN-CBE-HEALTH-PHC-011", name: "Gandhipuram Primary Health Centre", department: "Public Health Services", address: "Cross Cut Road, Coimbatore", distanceM: 310, confidence: 72, category: "Health service point" },
];

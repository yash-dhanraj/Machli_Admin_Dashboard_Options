import type {
  AdvisoryEntry,
  AlertWarning,
  ChartDatum,
  GovernmentScheme,
  Helpline,
  IncoisItem,
  Kpis,
  LandingCentre,
  NotificationRecord,
  OceanStateForecastEntry,
  PfzEntry,
  SolunarEntry,
  StateDistrict,
  SubDistrictVillage,
  UserRecord,
} from '../types';

// ---------------------------------------------------------------------------
// All data below is fixed, deterministic, illustrative sample data for the
// purpose of this design concept prototype only. Nothing here is fetched
// from a live API, database, or third-party service.
// ---------------------------------------------------------------------------

export const kpis: Kpis = {
  registeredUsers: 48250,
  incoisPending: 7,
  activeAlerts: 12,
  manualNotifications: 126,
  landingCentres: 326,
};

export const incoisItems: IncoisItem[] = [
  {
    id: 'INC-1001',
    alertType: 'High Wave Alert',
    state: 'Kerala',
    district: 'Alappuzha',
    location: 'Alappuzha Coast',
    issueDate: '20 Sep 2026',
    validityFrom: '03:30 PM',
    validityTo: '06:30 PM',
    verificationStatus: 'Pending Verification',
    fullMessage:
      'High wave activity of 2.5m to 3.2m expected along the Alappuzha coast. Fishermen are advised to avoid venturing into the sea during the validity window.',
  },
  {
    id: 'INC-1002',
    alertType: 'Rough Sea Warning',
    state: 'Gujarat',
    district: 'Porbandar',
    location: 'Porbandar Coast',
    issueDate: '20 Sep 2026',
    validityFrom: '04:00 PM',
    validityTo: '10:00 PM',
    verificationStatus: 'Pending Verification',
    fullMessage:
      'Rough sea conditions with wind speeds of 35-45 kmph expected off the Porbandar coast. Small crafts advised to return to shore.',
  },
  {
    id: 'INC-1003',
    alertType: 'Swell Surge',
    state: 'Tamil Nadu',
    district: 'Nagapattinam',
    location: 'Nagapattinam Coast',
    issueDate: '19 Sep 2026',
    validityFrom: '06:00 AM',
    validityTo: '06:00 PM',
    verificationStatus: 'Pending Verification',
    fullMessage:
      'Swell surge with wave heights up to 2m expected along the Nagapattinam coastline. Low-lying landing centres should exercise caution during mooring.',
  },
  {
    id: 'INC-1004',
    alertType: 'Ocean Current',
    state: 'Odisha',
    district: 'Puri',
    location: 'Puri Coast',
    issueDate: '19 Sep 2026',
    validityFrom: '08:00 AM',
    validityTo: '08:00 PM',
    verificationStatus: 'Pending Verification',
    fullMessage:
      'Strong ocean currents of 1.5 to 2 knots reported near Puri coast. Fishermen advised caution while operating close to the shoreline.',
  },
  {
    id: 'INC-1005',
    alertType: 'High Wave Alert',
    state: 'Karnataka',
    district: 'Udupi',
    location: 'Malpe Coast',
    issueDate: '18 Sep 2026',
    validityFrom: '05:00 AM',
    validityTo: '05:00 PM',
    verificationStatus: 'Verified',
    fullMessage:
      'High waves of 2.0m to 2.8m expected off Malpe coast, Udupi district. Small mechanised boats advised to stay alert.',
    reviewerNote: 'Location and validity cross-checked with district control room. Confirmed accurate.',
  },
  {
    id: 'INC-1006',
    alertType: 'Rough Sea Warning',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    location: 'Visakhapatnam Coast',
    issueDate: '17 Sep 2026',
    validityFrom: '09:00 AM',
    validityTo: '09:00 PM',
    verificationStatus: 'Verified',
    fullMessage:
      'Rough sea conditions expected off Visakhapatnam coast with gusty winds up to 40 kmph.',
    reviewerNote: 'Verified against regional meteorological bulletin.',
  },
  {
    id: 'INC-1007',
    alertType: 'Swell Surge',
    state: 'Maharashtra',
    district: 'Ratnagiri',
    location: 'Ratnagiri Coast',
    issueDate: '16 Sep 2026',
    validityFrom: '07:00 AM',
    validityTo: '07:00 PM',
    verificationStatus: 'Mismatch / Not Verified',
    fullMessage:
      'Swell surge activity reported off Ratnagiri coast with wave heights nearing 2.2m.',
    reviewerNote: 'District name in source bulletin did not match mapped coordinates. Escalated for correction.',
  },
];

export const notifications: NotificationRecord[] = [
  {
    id: 'NTF-2001',
    source: 'Manual',
    title: 'Fishing Ban',
    notificationType: 'Fishing Ban',
    message: 'Annual fishing ban period begins 01 Jun and continues through 31 Jul as per state fisheries notification.',
    location: 'Odisha Coast',
    state: 'Odisha',
    district: 'Puri',
    status: 'Sent',
    dateTime: '21 Sep 2026, 09:15 AM',
  },
  {
    id: 'NTF-2002',
    source: 'INCOIS',
    title: 'High Wave Alert',
    message: 'High wave activity expected along the Alappuzha coast.',
    location: 'Alappuzha Coast',
    state: 'Kerala',
    district: 'Alappuzha',
    status: 'Pending Verification',
    dateTime: '20 Sep 2026, 02:05 PM',
  },
  {
    id: 'NTF-2003',
    source: 'INCOIS',
    title: 'Rough Sea Warning',
    message: 'Rough sea conditions expected off the Porbandar coast.',
    location: 'Porbandar Coast',
    state: 'Gujarat',
    district: 'Porbandar',
    status: 'Pending Verification',
    dateTime: '20 Sep 2026, 11:40 AM',
  },
  {
    id: 'NTF-2004',
    source: 'INCOIS',
    title: 'High Wave Alert',
    message: 'High waves expected off Malpe coast, Udupi district.',
    location: 'Malpe Coast',
    state: 'Karnataka',
    district: 'Udupi',
    status: 'Verified',
    dateTime: '18 Sep 2026, 04:30 AM',
  },
  {
    id: 'NTF-2005',
    source: 'Manual',
    title: 'Government Scheme',
    notificationType: 'Government Scheme',
    message: 'PM Matsya Sampada Yojana registration window open for coastal district beneficiaries.',
    location: 'Tamil Nadu Coast',
    state: 'Tamil Nadu',
    district: 'Nagapattinam',
    status: 'Sent',
    dateTime: '17 Sep 2026, 10:00 AM',
  },
  {
    id: 'NTF-2006',
    source: 'Manual',
    title: 'Safety Advisory',
    notificationType: 'Safety Alert',
    message: 'All fishermen advised to carry GPS-enabled communication devices during monsoon season.',
    location: 'Goa Coast',
    state: 'Goa',
    district: 'North Goa',
    status: 'Sent',
    dateTime: '15 Sep 2026, 08:20 AM',
  },
  {
    id: 'NTF-2007',
    source: 'INCOIS',
    title: 'Swell Surge',
    message: 'Swell surge activity reported off Ratnagiri coast.',
    location: 'Ratnagiri Coast',
    state: 'Maharashtra',
    district: 'Ratnagiri',
    status: 'Mismatch / Not Verified',
    dateTime: '16 Sep 2026, 06:50 AM',
  },
];

export const usersByState: ChartDatum[] = [
  { label: 'Kerala', value: 11200 },
  { label: 'Tamil Nadu', value: 9800 },
  { label: 'Gujarat', value: 8100 },
  { label: 'Andhra Pradesh', value: 6900 },
  { label: 'Karnataka', value: 5200 },
  { label: 'Maharashtra', value: 4300 },
  { label: 'Odisha', value: 2750 },
];

export const usersByDistrict: ChartDatum[] = [
  { label: 'Alappuzha', value: 3100 },
  { label: 'Nagapattinam', value: 2800 },
  { label: 'Porbandar', value: 2500 },
  { label: 'Visakhapatnam', value: 2300 },
  { label: 'Udupi', value: 1900 },
  { label: 'Ratnagiri', value: 1600 },
];

export const usersByOccupation: ChartDatum[] = [
  { label: 'Fishing', value: 28400 },
  { label: 'Fish Vendor', value: 8600 },
  { label: 'Boat Owner', value: 5100 },
  { label: 'Aquaculture', value: 3450 },
  { label: 'Other', value: 2700 },
];

export const alertStatusDistribution: ChartDatum[] = [
  { label: 'Verified', value: 62 },
  { label: 'Pending Verification', value: 28 },
  { label: 'Mismatch / Not Verified', value: 10 },
];

export const users: UserRecord[] = [
  {
    id: 'USR-0001',
    name: 'Ramesh Kumar Nadar',
    mobile: '+91 98420 11234',
    age: 42,
    occupation: 'Fishing',
    platform: 'Android',
    state: 'Kerala',
    district: 'Alappuzha',
    subDistrict: 'Ambalappuzha',
    village: 'Purakkad',
    savedLocations: ['Alappuzha Landing Centre', 'Purakkad Beach'],
    emergencyContacts: [{ name: 'Suresh Nadar', relation: 'Brother', mobile: '+91 98420 55678' }],
  },
  {
    id: 'USR-0002',
    name: 'Devendra Bhai Solanki',
    mobile: '+91 97250 22345',
    age: 38,
    occupation: 'Boat Owner',
    platform: 'Android',
    state: 'Gujarat',
    district: 'Porbandar',
    subDistrict: 'Porbandar',
    village: 'Chhaya',
    savedLocations: ['Porbandar Fishing Harbour'],
  },
  {
    id: 'USR-0003',
    name: 'Muthu Selvam R',
    mobile: '+91 94860 33456',
    age: 51,
    occupation: 'Fishing',
    platform: 'iOS',
    state: 'Tamil Nadu',
    district: 'Nagapattinam',
    subDistrict: 'Nagapattinam',
    village: 'Akkaraipettai',
    emergencyContacts: [{ name: 'Lakshmi Selvam', relation: 'Spouse', mobile: '+91 94860 99887' }],
  },
  {
    id: 'USR-0004',
    name: 'Appalaraju Ch.',
    mobile: '+91 93910 44567',
    age: 35,
    occupation: 'Fish Vendor',
    platform: 'Android',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    subDistrict: 'Bheemunipatnam',
    village: 'Bheemili',
  },
  {
    id: 'USR-0005',
    name: 'Ganesh Shetty',
    mobile: '+91 90080 55678',
    age: 29,
    occupation: 'Aquaculture',
    platform: 'Android',
    state: 'Karnataka',
    district: 'Udupi',
    subDistrict: 'Udupi',
    village: 'Malpe',
    savedLocations: ['Malpe Fishing Harbour'],
  },
  {
    id: 'USR-0006',
    name: 'Vinayak Patil',
    mobile: '+91 98221 66789',
    age: 46,
    occupation: 'Fishing',
    platform: 'iOS',
    state: 'Maharashtra',
    district: 'Ratnagiri',
    subDistrict: 'Ratnagiri',
    village: 'Mirkarwada',
  },
  {
    id: 'USR-0007',
    name: 'Bijay Kumar Behera',
    mobile: '+91 94370 77890',
    age: 33,
    occupation: 'Other',
    otherOccupation: 'Net Repair Contractor',
    platform: 'Android',
    state: 'Odisha',
    district: 'Puri',
    subDistrict: 'Puri Sadar',
    village: 'Penthakata',
  },
  {
    id: 'USR-0008',
    name: 'Francis D Souza',
    mobile: '+91 98221 88901',
    age: 40,
    occupation: 'Boat Owner',
    platform: 'iOS',
    state: 'Goa',
    district: 'North Goa',
    subDistrict: 'Bardez',
    village: 'Baga',
    savedLocations: ['Baga Fishing Jetty'],
    emergencyContacts: [{ name: 'Maria D Souza', relation: 'Spouse', mobile: '+91 98221 00998' }],
  },
];

export const landingCentres: LandingCentre[] = [
  { id: 'LC-001', name: 'Alappuzha Landing Centre', flcId: 'FLC-KL-014', state: 'Kerala', district: 'Alappuzha', location: 'Alappuzha Coast', x: 32, y: 74 },
  { id: 'LC-002', name: 'Porbandar Fishing Harbour', flcId: 'FLC-GJ-006', state: 'Gujarat', district: 'Porbandar', location: 'Porbandar Coast', x: 18, y: 34 },
  { id: 'LC-003', name: 'Nagapattinam Landing Centre', flcId: 'FLC-TN-021', state: 'Tamil Nadu', district: 'Nagapattinam', location: 'Nagapattinam Coast', x: 46, y: 82 },
  { id: 'LC-004', name: 'Visakhapatnam Fishing Harbour', flcId: 'FLC-AP-009', state: 'Andhra Pradesh', district: 'Visakhapatnam', location: 'Visakhapatnam Coast', x: 54, y: 58 },
  { id: 'LC-005', name: 'Malpe Fishing Harbour', flcId: 'FLC-KA-011', state: 'Karnataka', district: 'Udupi', location: 'Malpe Coast', x: 26, y: 62 },
  { id: 'LC-006', name: 'Ratnagiri Mirkarwada Harbour', flcId: 'FLC-MH-017', state: 'Maharashtra', district: 'Ratnagiri', location: 'Ratnagiri Coast', x: 22, y: 46 },
  { id: 'LC-007', name: 'Puri Penthakata Landing Centre', flcId: 'FLC-OD-004', state: 'Odisha', district: 'Puri', location: 'Puri Coast', x: 58, y: 50 },
  { id: 'LC-008', name: 'Baga Fishing Jetty', flcId: 'FLC-GA-002', state: 'Goa', district: 'North Goa', location: 'Baga Coast', x: 24, y: 54 },
];

export const alertsWarnings: AlertWarning[] = [
  { id: 'ALW-01', alertType: 'High Wave Alert', location: 'Alappuzha Coast', state: 'Kerala', district: 'Alappuzha', issueDate: '20 Sep 2026', validity: '03:30 PM - 06:30 PM', source: 'INCOIS', verificationStatus: 'Pending Verification', x: 32, y: 74 },
  { id: 'ALW-02', alertType: 'Rough Sea Warning', location: 'Porbandar Coast', state: 'Gujarat', district: 'Porbandar', issueDate: '20 Sep 2026', validity: '04:00 PM - 10:00 PM', source: 'INCOIS', verificationStatus: 'Pending Verification', x: 18, y: 34 },
  { id: 'ALW-03', alertType: 'Swell Surge', location: 'Nagapattinam Coast', state: 'Tamil Nadu', district: 'Nagapattinam', issueDate: '19 Sep 2026', validity: '06:00 AM - 06:00 PM', source: 'INCOIS', verificationStatus: 'Pending Verification', x: 46, y: 82 },
  { id: 'ALW-04', alertType: 'Ocean Current', location: 'Puri Coast', state: 'Odisha', district: 'Puri', issueDate: '19 Sep 2026', validity: '08:00 AM - 08:00 PM', source: 'INCOIS', verificationStatus: 'Pending Verification', x: 58, y: 50 },
  { id: 'ALW-05', alertType: 'High Wave Alert', location: 'Malpe Coast', state: 'Karnataka', district: 'Udupi', issueDate: '18 Sep 2026', validity: '05:00 AM - 05:00 PM', source: 'INCOIS', verificationStatus: 'Verified', x: 26, y: 62 },
  { id: 'ALW-06', alertType: 'Rough Sea Warning', location: 'Visakhapatnam Coast', state: 'Andhra Pradesh', district: 'Visakhapatnam', issueDate: '17 Sep 2026', validity: '09:00 AM - 09:00 PM', source: 'INCOIS', verificationStatus: 'Verified', x: 54, y: 58 },
  { id: 'ALW-07', alertType: 'Fishing Ban Period', location: 'Odisha Coast', state: 'Odisha', district: 'Puri', issueDate: '01 Jun 2026', validity: '01 Jun - 31 Jul 2026', source: 'INCOIS', verificationStatus: 'Verified', x: 58, y: 47 },
  { id: 'ALW-08', alertType: 'Swell Surge', location: 'Ratnagiri Coast', state: 'Maharashtra', district: 'Ratnagiri', issueDate: '16 Sep 2026', validity: '07:00 AM - 07:00 PM', source: 'INCOIS', verificationStatus: 'Mismatch / Not Verified', x: 22, y: 46 },
];

export const governmentSchemes: GovernmentScheme[] = [
  { id: 'GS-01', scheme: 'PM Matsya Sampada Yojana', category: 'Fisheries Development', state: 'All States', coverage: 'Pan-India coastal districts', fromDate: '01 Apr 2026', toDate: '31 Mar 2027', source: 'Ministry of Fisheries, Animal Husbandry & Dairying' },
  { id: 'GS-02', scheme: 'Kerala Fishermen Welfare Fund', category: 'Welfare & Insurance', state: 'Kerala', coverage: 'All coastal districts', fromDate: '01 Jan 2026', toDate: '31 Dec 2026', source: 'Kerala State Fisheries Department' },
  { id: 'GS-03', scheme: 'Saagar Mitra Scheme', category: 'Livelihood Support', state: 'Tamil Nadu', coverage: 'Nagapattinam, Ramanathapuram, Thoothukudi', fromDate: '01 Jun 2026', toDate: '31 May 2027', source: 'Tamil Nadu Fisheries Department' },
  { id: 'GS-04', scheme: 'Gujarat Fish Farmers Subsidy', category: 'Subsidy', state: 'Gujarat', coverage: 'Porbandar, Veraval, Okha', fromDate: '01 Apr 2026', toDate: '31 Mar 2027', source: 'Gujarat Fisheries Department' },
  { id: 'GS-05', scheme: 'National Fisheries Insurance Scheme', category: 'Welfare & Insurance', state: 'All States', coverage: 'Pan-India registered fishermen', fromDate: '01 Jan 2026', toDate: '31 Dec 2026', source: 'Ministry of Fisheries, Animal Husbandry & Dairying' },
];

export const helplines: Helpline[] = [
  { name: 'National Disaster Management Helpline', number: '1078', scope: 'National' },
  { name: 'Indian Coast Guard MRCC', number: '1554', scope: 'National' },
  { name: 'Kerala State Fisheries Helpline', number: '0471-2338333', scope: 'State', state: 'Kerala' },
  { name: 'Tamil Nadu Fisheries Helpline', number: '044-25671333', scope: 'State', state: 'Tamil Nadu' },
  { name: 'Gujarat Coastal Security Helpline', number: '079-23252929', scope: 'State', state: 'Gujarat' },
  { name: 'Alappuzha District Control Room', number: '0477-2251633', scope: 'District / Local', state: 'Kerala', district: 'Alappuzha' },
  { name: 'Nagapattinam District Control Room', number: '04365-249566', scope: 'District / Local', state: 'Tamil Nadu', district: 'Nagapattinam' },
  { name: 'Porbandar District Control Room', number: '0286-2242700', scope: 'District / Local', state: 'Gujarat', district: 'Porbandar' },
];

export const oceanStateForecasts: OceanStateForecastEntry[] = [
  { id: 'OSF-01', landingCentre: 'Alappuzha Landing Centre', dateTime: '22 Sep 2026, 06:00 AM', range: '20 km', wind: '18 kmph, SW', wave: '1.2 m', current: '0.6 knots', sst: '29.4°C', message: 'Moderate sea conditions suitable for fishing operations.' },
  { id: 'OSF-02', landingCentre: 'Porbandar Fishing Harbour', dateTime: '22 Sep 2026, 06:00 AM', range: '50 km', wind: '24 kmph, W', wave: '1.6 m', current: '0.8 knots', sst: '28.1°C', message: 'Slightly rough conditions expected during afternoon hours.' },
  { id: 'OSF-03', landingCentre: 'Malpe Fishing Harbour', dateTime: '22 Sep 2026, 06:00 AM', range: '100 km', wind: '20 kmph, SW', wave: '1.4 m', current: '0.7 knots', sst: '29.0°C', message: 'Favourable conditions along the coast through the day.' },
];

export const pfzEntries: PfzEntry[] = [
  { id: 'PFZ-01', fishingZone: 'Zone A - 14.2°N, 74.1°E', depth: '40-60 m', distance: '32 km from coast', landingCentre: 'Malpe Fishing Harbour', validity: 'Valid till 24 Sep 2026' },
  { id: 'PFZ-02', fishingZone: 'Zone B - 9.6°N, 79.9°E', depth: '25-45 m', distance: '18 km from coast', landingCentre: 'Nagapattinam Landing Centre', validity: 'Valid till 23 Sep 2026' },
  { id: 'PFZ-03', fishingZone: 'Zone C - 21.5°N, 69.8°E', depth: '35-55 m', distance: '28 km from coast', landingCentre: 'Porbandar Fishing Harbour', validity: 'Valid till 25 Sep 2026' },
];

export const tunaFishingAdvisories: AdvisoryEntry[] = [
  { id: 'TUNA-01', location: 'Nagapattinam Coast', date: '21 Sep 2026', message: 'Favourable tuna aggregation reported 25-30 km off Nagapattinam coast. Suitable for longline operations.' },
  { id: 'TUNA-02', location: 'Malpe Coast', date: '20 Sep 2026', message: 'Moderate tuna activity observed near Malpe fishing grounds during early morning hours.' },
  { id: 'TUNA-03', location: 'Visakhapatnam Coast', date: '19 Sep 2026', message: 'Tuna advisory zone active off Visakhapatnam coast with favourable sea surface temperature.' },
];

export const svasAdvisories: AdvisoryEntry[] = [
  { id: 'SVAS-01', location: 'Alappuzha Coast', date: '21 Sep 2026', message: 'Satellite Vessel Advisory System indicates favourable chlorophyll concentration near Alappuzha coast.' },
  { id: 'SVAS-02', location: 'Porbandar Coast', date: '20 Sep 2026', message: 'SVAS bulletin indicates moderate productivity zone approximately 20 km off Porbandar coast.' },
];

export const solunarEntries: SolunarEntry[] = [
  { id: 'SOL-01', location: 'Alappuzha Coast', date: '22 Sep 2026', sunrise: '06:12 AM', sunset: '06:08 PM', highTide: '09:40 AM / 10:05 PM', lowTide: '03:20 AM / 04:02 PM', tideForecast: 'Semi-diurnal, moderate amplitude' },
  { id: 'SOL-02', location: 'Porbandar Coast', date: '22 Sep 2026', sunrise: '06:32 AM', sunset: '06:41 PM', highTide: '08:55 AM / 09:20 PM', lowTide: '02:40 AM / 03:15 PM', tideForecast: 'Semi-diurnal, high amplitude' },
  { id: 'SOL-03', location: 'Malpe Coast', date: '22 Sep 2026', sunrise: '06:18 AM', sunset: '06:15 PM', highTide: '10:10 AM / 10:35 PM', lowTide: '04:00 AM / 04:30 PM', tideForecast: 'Semi-diurnal, moderate amplitude' },
];

export const statesDistricts: StateDistrict[] = [
  { state: 'Kerala', districts: ['Alappuzha', 'Ernakulam', 'Kollam', 'Kozhikode', 'Thiruvananthapuram'] },
  { state: 'Tamil Nadu', districts: ['Nagapattinam', 'Ramanathapuram', 'Thoothukudi', 'Chennai', 'Kanyakumari'] },
  { state: 'Gujarat', districts: ['Porbandar', 'Veraval', 'Okha', 'Jamnagar', 'Bhavnagar'] },
  { state: 'Andhra Pradesh', districts: ['Visakhapatnam', 'Kakinada', 'Nellore', 'Srikakulam'] },
  { state: 'Karnataka', districts: ['Udupi', 'Dakshina Kannada', 'Uttara Kannada'] },
  { state: 'Maharashtra', districts: ['Ratnagiri', 'Raigad', 'Sindhudurg', 'Palghar'] },
  { state: 'Odisha', districts: ['Puri', 'Ganjam', 'Kendrapara', 'Balasore'] },
  { state: 'Goa', districts: ['North Goa', 'South Goa'] },
];

export const subDistrictsVillages: SubDistrictVillage[] = [
  { district: 'Alappuzha', subDistrict: 'Ambalappuzha', villages: ['Purakkad', 'Thumpoly', 'Punnapra'] },
  { district: 'Nagapattinam', subDistrict: 'Nagapattinam', villages: ['Akkaraipettai', 'Keechankuppam', 'Vellapallam'] },
  { district: 'Porbandar', subDistrict: 'Porbandar', villages: ['Chhaya', 'Navibandar', 'Ranavav'] },
  { district: 'Visakhapatnam', subDistrict: 'Bheemunipatnam', villages: ['Bheemili', 'Kalagondapalem'] },
  { district: 'Udupi', subDistrict: 'Udupi', villages: ['Malpe', 'Kaup', 'Kapu'] },
  { district: 'Ratnagiri', subDistrict: 'Ratnagiri', villages: ['Mirkarwada', 'Bhagawati Bandar'] },
  { district: 'Puri', subDistrict: 'Puri Sadar', villages: ['Penthakata', 'Chakratirtha'] },
  { district: 'North Goa', subDistrict: 'Bardez', villages: ['Baga', 'Calangute'] },
];

export const occupations: { name: string; description: string; userCount: number }[] = [
  { name: 'Fishing', description: 'Active fishermen engaged in marine capture fishing', userCount: 28400 },
  { name: 'Fish Vendor', description: 'Fish trading and retail/wholesale vending', userCount: 8600 },
  { name: 'Boat Owner', description: 'Owners of fishing vessels and mechanised boats', userCount: 5100 },
  { name: 'Aquaculture', description: 'Fish and shrimp farming operators', userCount: 3450 },
  { name: 'Other', description: 'Allied occupations such as net repair, ice supply, and logistics', userCount: 2700 },
];

export const landingCentresByState: ChartDatum[] = [
  { label: 'Kerala', value: 68 },
  { label: 'Tamil Nadu', value: 74 },
  { label: 'Gujarat', value: 52 },
  { label: 'Andhra Pradesh', value: 46 },
  { label: 'Karnataka', value: 34 },
  { label: 'Maharashtra', value: 30 },
  { label: 'Odisha', value: 22 },
];

export const notificationTypes = [
  'Safety Alert',
  'Marine Advisory',
  'Fishing Ban',
  'Government Scheme',
  'General Information',
  'Emergency',
] as const;

export const adminProfile = {
  name: 'Admin User',
  email: 'admin@machli.gov.in',
  role: 'Platform Administrator',
  lastLogin: '22 Sep 2026, 09:04 AM',
};

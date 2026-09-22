export type OptionId = 'option-1' | 'option-2' | 'option-3';

export type VerificationStatus = 'Pending Verification' | 'Verified' | 'Mismatch / Not Verified';

export type NotificationSource = 'Manual' | 'INCOIS';

export type NotificationStatus = 'Sent' | 'Verified' | 'Pending Verification' | 'Mismatch / Not Verified';

export type AlertType =
  | 'High Wave Alert'
  | 'Rough Sea Warning'
  | 'Swell Surge'
  | 'Ocean Current'
  | 'Fishing Ban Period';

export type NotificationType =
  | 'Safety Alert'
  | 'Marine Advisory'
  | 'Fishing Ban'
  | 'Government Scheme'
  | 'General Information'
  | 'Emergency';

export interface IncoisItem {
  id: string;
  alertType: AlertType;
  state: string;
  district: string;
  location: string;
  issueDate: string;
  validityFrom: string;
  validityTo: string;
  verificationStatus: VerificationStatus;
  fullMessage: string;
  reviewerNote?: string;
}

export interface NotificationRecord {
  id: string;
  source: NotificationSource;
  title: string;
  notificationType?: NotificationType;
  message: string;
  location: string;
  state: string;
  district: string;
  status: NotificationStatus;
  dateTime: string;
}

export interface UserRecord {
  id: string;
  name: string;
  mobile: string;
  age: number;
  occupation: string;
  otherOccupation?: string;
  platform: 'Android' | 'iOS';
  state: string;
  district: string;
  subDistrict: string;
  village: string;
  savedLocations?: string[];
  emergencyContacts?: { name: string; relation: string; mobile: string }[];
}

export interface LandingCentre {
  id: string;
  name: string;
  flcId: string;
  state: string;
  district: string;
  location: string;
  x: number; // conceptual position % for map visualization
  y: number;
}

export interface AlertWarning {
  id: string;
  alertType: AlertType;
  location: string;
  state: string;
  district: string;
  issueDate: string;
  validity: string;
  source: 'INCOIS';
  verificationStatus: VerificationStatus;
  x: number;
  y: number;
}

export interface GovernmentScheme {
  id: string;
  scheme: string;
  category: string;
  state: string;
  coverage: string;
  fromDate: string;
  toDate: string;
  source: string;
}

export interface Helpline {
  name: string;
  number: string;
  scope: 'National' | 'State' | 'District / Local';
  state?: string;
  district?: string;
}

export interface OceanStateForecastEntry {
  id: string;
  landingCentre: string;
  dateTime: string;
  range: '20 km' | '50 km' | '100 km';
  wind: string;
  wave: string;
  current: string;
  sst: string;
  message: string;
}

export interface PfzEntry {
  id: string;
  fishingZone: string;
  depth: string;
  distance: string;
  landingCentre: string;
  validity: string;
}

export interface AdvisoryEntry {
  id: string;
  location: string;
  date: string;
  message: string;
}

export interface SolunarEntry {
  id: string;
  location: string;
  date: string;
  sunrise: string;
  sunset: string;
  highTide: string;
  lowTide: string;
  tideForecast: string;
}

export interface StateDistrict {
  state: string;
  districts: string[];
}

export interface SubDistrictVillage {
  district: string;
  subDistrict: string;
  villages: string[];
}

export interface Kpis {
  registeredUsers: number;
  incoisPending: number;
  activeAlerts: number;
  manualNotifications: number;
  landingCentres: number;
}

export interface ChartDatum {
  label: string;
  value: number;
}

export type Colorway = 'space-black' | 'titanium-silver' | 'deep-aurora';

export interface ColorwayConfig {
  id: Colorway;
  name: string;
  subname: string;
  accentHex: string;
  glowColor: string;
  badgeBorder: string;
  heroTint: string;
}

export interface Hotspot {
  id: string;
  title: string;
  x: number; // percentage
  y: number; // percentage
  tag: string;
  description: string;
  spec: string;
}

export interface OrderDetails {
  color: Colorway;
  engraving: string;
  caseOption: 'standard' | 'power-pro';
  protectionPlan: boolean;
  total: number;
}

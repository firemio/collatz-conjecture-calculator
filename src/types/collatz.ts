export interface Step {
  number: number;
  binary: string;
  step: number;
}

export interface CollatzRules {
  evenDivisor: number;
  oddMultiplier: number;
}

export const defaultRules: CollatzRules = {
  evenDivisor: 2,
  oddMultiplier: 3
};
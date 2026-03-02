export interface FibrePackage {
    type: 'fibre';
    name: string;
    price: number;
    speedUp: number;
    speedDown: number;
    description: string;
    bestFor: string;
}

export interface WebhostingPackage {
    type: 'webhosting';
    name: string;
    price: string;
    storage: string;
    bandwidth: string;
    emailAccounts: number;
}

export interface VoipPackage {
    type: 'voip';
    name: string;
    price: string;
    features: string[];
}

export type AnyPackage = FibrePackage | WebhostingPackage | VoipPackage;

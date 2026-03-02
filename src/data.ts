import { FibrePackage, WebhostingPackage, VoipPackage } from './types';

export const fibrePackages: FibrePackage[] = [
    {
        type: 'fibre',
        name: 'Quantum-Flux 25/10',
        price: 599,
        speedUp: 10,
        speedDown: 25,
        description: 'Ideal for streaming, gaming, and everyday browsing.',
        bestFor: 'Small households and casual users.',
    },
    {
        type: 'fibre',
        name: 'Quantum-Warp 50/25',
        price: 799,
        speedUp: 25,
        speedDown: 50,
        description: 'Perfect for multiple devices and HD streaming.',
        bestFor: 'Families and moderate to heavy users.',
    },
    {
        type: 'fibre',
        name: 'Quantum-Singularity 100/50',
        price: 999,
        speedUp: 50,
        speedDown: 100,
        description: 'Ultra-fast speeds for demanding applications.',
        bestFor: 'Power users, professionals, and large households.',
    },
];

export const webhostingPackages: WebhostingPackage[] = [
    {
        type: 'webhosting',
        name: 'Stellar Hosting',
        price: 'R49',
        storage: '10GB',
        bandwidth: '100GB',
        emailAccounts: 5,
    },
    {
        type: 'webhosting',
        name: 'Nebula Hosting',
        price: 'R99',
        storage: '50GB',
        bandwidth: '500GB',
        emailAccounts: 20,
    },
    {
        type: 'webhosting',
        name: 'Galaxy Hosting',
        price: 'R199',
        storage: 'Unlimited',
        bandwidth: 'Unlimited',
        emailAccounts: 100,
    },
];

export const voipPackages: VoipPackage[] = [
    {
        type: 'voip',
        name: 'Echo Base',
        price: 'R150',
        features: ['Crystal-clear HD voice', 'Voicemail to email', 'Call forwarding'],
    },
    {
        type: 'voip',
        name: 'Photon Pro',
        price: 'R250',
        features: ['All Echo Base features', 'Auto-attendant (IVR)', 'Call recording'],
    },
    {
        type: 'voip',
        name: 'Quantum Matrix',
        price: 'R400',
        features: ['All Photon Pro features', 'Multi-line support', 'Advanced analytics'],
    },
];

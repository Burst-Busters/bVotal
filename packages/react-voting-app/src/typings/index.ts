

// TODO split in files if it grows
export type VotingOption = { key: string, title: string; desc: string };
export type ActivationMessage = {
    vopts: VotingOption[],
    vpubk: string
}

export enum ActivationState {
    Pending,
    Activated
}

export enum IS_ELIGIBLE_ENUM {
    PENDING,
    YES,
    NO
}

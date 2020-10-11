

// TODO split in files if it grows
export type VotingOption = { key: string, title: string; desc: string };
export type VotingAddress = string;
export type ActivationMessage = {
    vopts: VotingOption[],
    vaddrs: VotingAddress
}

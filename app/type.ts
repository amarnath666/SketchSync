export interface KindeState {
    user: {
        id: string;
        email: string | null;
        given_name: string | null;
        picture: string | null;
    } | null
}

export interface TEAM {
    createdBy: String,
    teamName: String,
    _id: String
}
export interface KindeState {
    user: {
        id: string;
        email: string | null;
        given_name: string | null;
        picture: string | null;
    } | null
}

export interface TEAM {
    createdBy?: String,
    teamName: String,
    _id: String,
    member?: String
}

export interface FILE {
    archive: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    teamId: string,
    whiteboard: string,
    _id: string,
    _creationTime: number
}

export interface SkeletonProps {
    rows?: number;
    height?: number;
    width?: string | number;
    circular?: boolean;
    circleSize?: number;
}

export type LayoutType = 'text' | 'canvas' | 'both';
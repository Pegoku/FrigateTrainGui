export type FacesMap = Record<string, string[]>;
export type FaceData = [string, string];   //     'Jose-1767451698.756786.webp', 
export type TrainFaceData = [number, string, number, string, string];   //     '1767612498.858559-0rm9k5-1767612513.904397-Pere-0.86.webp', 
export interface HomeContentProps {
    faceData: FacesMap;
    faceCount: Record<string, number>;
}

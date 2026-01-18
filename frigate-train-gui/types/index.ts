export type FacesMap = Record<string, string[]>;
export type FaceData = [number, string, number, string, string];   //     '1767612498.858559-0rm9k5-1767612513.904397-Pere-0.86.webp', 
export interface HomeProps {
    groupedFaces: Record<string, string[]>;
    maxName: Record<string, string>;
    percentMap: Record<string, number>;
    faceCount: Record<string, number>;
}

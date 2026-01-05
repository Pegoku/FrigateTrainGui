const faces = [
    '1767612498.858559-0rm9k5-1767612513.904397-cccc-0.86.webp',
    '1767612498.858559-tcumqh-1767612521.697893-aaaa-1.0.webp',
    '1767612498.858559-ltsbu4-1767612331.116098-unknown-0.7.webp',
    '1767612491.659065-3b5fr6-1767612492.131737-unknown-0.37.webp',
    '1767612423.263243-fhnyu8-1767612423.815185-bbbb-0.93.webp',
    '1767612328.034565-l86o0x-1767612330.450742-unknown-0.72.webp',
    '1767612328.034565-4svlxv-1767613510.938223-cccc-0.96.webp',
    '1767612328.034565-iqbtqd-1767612897.712311-cccc-0.81.webp',]
    
const groupedFaces: Record<string, string[]> = {};
for (const face of faces) {
    const timestamp: string = face.split("-")[0] as string;
    if (!groupedFaces[timestamp]) {
        groupedFaces[timestamp] = [];
    }
    groupedFaces[timestamp].push(face);
}

console.log(groupedFaces);
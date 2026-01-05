interface FaceProps{
    img: string;
    name: string;
    timestamp: number;
    percent: number;
}

export default function Face({img, name, timestamp, percent}: FaceProps) {
    return (
        <div className="m-4 p-4 w-32 bg-zinc-900 rounded-lg inline-block">
            <img src={img} alt={name} className="w-44 h-44 blur"/>
            <div>
                <h3 className="blur">{name}</h3>
                <p>{percent}%</p>
            </div>
        </div>

    )

}
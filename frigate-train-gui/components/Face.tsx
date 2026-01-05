interface FaceProps{
    img: string;
    name: string;
    percent: number;
}

export default function Face({img, name, percent}: FaceProps) {
    return (
        <div className="m-4 p-4 w-32 bg-zinc-900 rounded-lg">
            <img src={img} alt={name} className="size-44"/>
            <div>
                <h3>{name}</h3>
                <p>{percent}%</p>
            </div>
        </div>

    )

}
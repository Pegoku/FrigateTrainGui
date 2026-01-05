interface FaceProps{
    img: string;
    name: string;
    percent: number;
}

export default function Face({img, name, percent}: FaceProps) {
    return (
        <div className="inline-block">

            <img src={img} alt={name} className="w-44 h-44 blur-lg"/>
            <div>
                <h3 className="blur">{name}</h3>
                <p>{percent}%</p>
            </div>

        </div>

    )

}
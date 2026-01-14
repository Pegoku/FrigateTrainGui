interface FaceProps{
    img: string;
    name: string;
    percent: number;
}

export default function Face({img, name, percent}: FaceProps) {
    return (
        <div className="inline-block mx-1 ">

            <img src={img} alt={name} className="w-44 h-44 rounded-lg blur"/>
            <div>
                <h3 className="blur">{name}</h3>
                <p>{percent}%</p>
            </div>

        </div>

    )

}
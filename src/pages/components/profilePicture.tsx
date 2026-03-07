import { User } from "lucide-react"
import "./profilePicture.css"

export default function ProfilePicture({ fontcolor, backcolor, pSize, dimention }: { fontcolor: string; backcolor: string; pSize: number; dimention?: string }) {
    return (
        <div className="profilePicture" style={{color: fontcolor, backgroundColor: backcolor, width: dimention ? dimention : "50px", height: dimention ? dimention : "50px"}}>
            <User size={pSize}/>
        </div>
    )
}
import "./pageTemplate.css";
import { Link } from "react-router-dom";

interface Props {
    component: React.ReactNode;
}

export default function PageTemplate({ component }: Props) {
    return (
        <div className="homeContainer">
            <Link to="/" style={{ textDecoration: "none" }}><div className="header">Modern Walk</div></Link>
            <hr className="hr"></hr>
            <div className="homeContent">
                <div className="content">{component}</div>
            </div>
        </div>
    )
}
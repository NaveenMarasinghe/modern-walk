import "./homepage.css";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Home from "../../components/home/Home";


export default function Homepage() {
    return (
        <PageTemplate component={<Home />} />
    )
}
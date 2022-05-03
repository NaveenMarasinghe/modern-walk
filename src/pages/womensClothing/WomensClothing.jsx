import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Clothing from "../../components/clothing/Clothing";

export default function WomensClothing() {
    return (
        <PageTemplate component={<Clothing category="women" />} />
    )
}
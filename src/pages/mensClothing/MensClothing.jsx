import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Clothing from "../../components/clothing/Clothing";


export default function MensClothing() {
    return (
        <PageTemplate component={<Clothing category="men" />} />
    )
}
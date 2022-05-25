import PageTemplate from "../../sections/pageTemplate/PageTemplate";
import Clothing from "../../sections/clothing/Clothing";

export default function MensClothing() {
  return <PageTemplate component={<Clothing category="men" />} />;
}

import { useParams } from "react-router-dom";

export default function CustomerPage() {
  const { shopName } = useParams();
  console.log(shopName);

  return <div>This is {shopName} page</div>;
}

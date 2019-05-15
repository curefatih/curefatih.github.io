import ShadowBox from "@component/ShadowBox/ShadowBox";
import Link from "next/link";

export default function PostCard(props) {
  const { id, title, date, description } = props;
  return (
    <ShadowBox className="text-2xl mb-2 font-bold text-black dark:text-white">
      <Link href={"/blog/" + id}>
        <a className="">{title}</a>
      </Link>
      <br />
      <p>{description}</p>
      <div className="text-gray-500">{date}</div>
    </ShadowBox>
  );
}

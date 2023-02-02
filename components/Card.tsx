import Link from "next/link";

interface Props {
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly href: string;
}

const Card = ({ code, name, type, href }: Props) => (
  <Link href={href}>
    <button className="border p-6 rounded-lg">
      <p>
        <span className="font-semibold">Code</span>: {code}
      </p>
      <p>
        <span className="font-semibold">Name</span>: {name}
      </p>
      <p>
        <span className="font-semibold">Type</span>: {type}
      </p>
    </button>
  </Link>
);

export default Card;

import { GetStaticProps, GetStaticPaths } from "next";

import { indicators } from "../../data/descriptions.json";
import { dependencies } from "../../data/dependencies.json";

import Card from "../../components/Card";

type IndicatorCode = keyof typeof indicators;
type Indicator = typeof indicators[IndicatorCode] & { description_en?: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(indicators);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  Props,
  Record<"code", IndicatorCode>
> = async ({ params }) => {
  const { code } = params!;

  return { props: { code } };
};

interface Props {
  readonly code: IndicatorCode;
}

const Indicator = ({ code }: Props) => {
  const { name_en, description_en } = indicators[code] as Indicator;

  const { dependencies: dependenciesList = [] } = dependencies.hasOwnProperty(
    code
  )
    ? dependencies[code as keyof typeof dependencies]
    : {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p>
        <span className="font-semibold">Name</span>: {name_en}
      </p>
      <p>
        <span className="font-semibold">Description</span>: {description_en}
      </p>
      <div>
        {dependenciesList.map((code: string) => {
          const { name_en, type } = indicators[code as IndicatorCode];

          return (
            <Card
              key={code}
              code={code}
              name={name_en}
              type={type}
              href={`/indicators/${code}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Indicator;

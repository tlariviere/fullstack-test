import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { indicators } from "../data/descriptions.json";
import Card from "../components/Card";

type Indicator = typeof indicators[keyof typeof indicators];

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Indicator[]>([]);

  useEffect(() => {
    if (searchValue.length > 1) {
      setSearchResults(
        Object.entries(indicators)
          .filter(([key]) =>
            key.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          .map(([, indicator]) => indicator)
      );
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-lg font-bold">Genesis Indicators</h1>

      <input
        className="mt-8 border p-2 rounded-lg"
        type="text"
        placeholder="Rechercher..."
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
      />

      <div className="mt-8 flex flex-wrap gap-8 px-32">
        {searchResults.map(({ code, name_en, type }) => (
          <Card
            key={code}
            code={code}
            name={name_en}
            type={type}
            href={`/indicators/${code}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

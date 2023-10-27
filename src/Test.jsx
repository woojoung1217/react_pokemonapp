import "./App.css";
/* eslint-disable */
import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]); // 포켓몬 데이터 저장
  const [offset, setOffset] = useState(0); // 처음 불러오는 데이터를 20개로
  const [limit, setLimit] = useState(20); // fetch ���수를 20개로 설정

  const [searchTerm, SetsearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // use debounce custom hook{검색에 입력되는 시간을 자체적으로 딜레이 시켜 호출 요청을 줄임}

  useEffect(() => {
    fetchPokeData(true);
  }, []);

  useEffect(() => {
    handleSearchInput(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchPokeData = async (isFistFetch) => {
    try {
      const offsetValue = isFistFetch ? 0 : offset + limit;
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetValue}`;
      const response = await axios.get(url);

      setPokemons([...pokemons, ...response.data.results]);

      setOffset(offsetValue);
    } catch (error) {
      setPokemons([]);
      console.error(error);
    }
  };

  const handleSearchInput = async (searchTerm) => {
    if (searchTerm.length > 0) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
        );
        const pokemonData = {
          url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          name: searchTerm,
        };
        setPokemons([pokemonData]);
      } catch (error) {
        setPokemons([]);
      }
    } else {
      fetchPokeData(true);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50 justify-center items-center">
        <div className="relative z-50">
          <form className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center "
              value={searchTerm}
              onChange={(e) => {
                SetsearchTerm(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700"
            >
              검색
            </button>
          </form>
        </div>
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }, index) => (
              <PokeCard url={url} name={name} key={url} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        <button
          onClick={() => fetchPokeData(false)}
          className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
        >
          더 보기
        </button>
      </div>
    </article>
  );
}

export default App;

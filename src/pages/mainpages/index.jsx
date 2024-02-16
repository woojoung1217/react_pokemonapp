/* eslint-disable */
import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";
import AutoComplete from "../../components/AutoComplete";

function MainPage() {
  /** 모든 포켓몬 데이터를 불러오는 state */
  const [allPokemons, setAllPokemons] = useState([]);

  // 실제 보여지는 데이터를 가지고 있는 state
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  // server url
  const url = `https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0`;
  // 한번에 보여지는 포켓몬 수
  const limitNum = 20;

  useEffect(() => {
    fetchPokeData();
  }, []);

  /** 불러온 포켓몬 데이터를 보여주는 데이터로 변환하는 함수 */
  const filterDisplayedPokemonData = (
    allPokemonsData,
    displayedPokemons = []
  ) => {
    const limit = displayedPokemons.length + limitNum;
    const array = allPokemonsData.filter(
      (pokemon, index) => index + 1 <= limit
    );
    return array;
  };

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      setAllPokemons(response.data.results); // 모든 포켓몬 저장
      // 실제로 화면에 보여줄 포켓몬 list
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50 justify-center items-center">
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <h1 className="justify-center items-center text-slate-900 bg-slate-500 inline-block text-center">
        우중스 포켓몬 도감
      </h1>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
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
        {allPokemons.length > displayedPokemons.length &&
          displayedPokemons.length !== 1 && (
            <button
              onClick={() =>
                setDisplayedPokemons(
                  filterDisplayedPokemonData(allPokemons, displayedPokemons)
                )
              }
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              더 보기
            </button>
          )}
      </div>
    </article>
  );
}

export default MainPage;

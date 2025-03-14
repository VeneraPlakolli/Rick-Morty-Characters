import { useQuery } from "@apollo/client";
import GET_CHARACTERS from "../characters";
import { useInView } from "react-intersection-observer";

import { createContext, useState, useEffect } from "react";

const CharactersContext = createContext({
  filteredCharacters: [],
  handleFilterCategory: () => {},
  selectedCategory: {},
  charData: [],
  loading: false,
  error: "",
  isLoading: false,
  ref: "",
  sortOption: "",
  handleSort: () => {},
});

export function CharactersContextProvider({ children }) {
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS);

  const [charData, setCharData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    status: "All",
    species: "All",
  });
  const [sortOption, setSortOption] = useState("");

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  useEffect(() => {
    if (data?.characters?.results) {
      setCharData(data.characters.results);
    }
    if (inView && data?.characters.info.next) {
      setIsLoading(true);
      setTimeout(() => {
        fetchMore({
          variables: { page: data.characters.info.next },
          updateQuery: (prevData, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevData;
            return {
              characters: {
                ...fetchMoreResult.characters,
                results: [
                  ...prevData.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            };
          },
        }).finally(() => setIsLoading(false));
      }, 2000);
    }
  }, [inView, data, fetchMore]);

  function handleFilterCategory(e) {
    const { name, value } = e.target;
    setSelectedCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const filteredCharacters = charData.filter((char) => {
    return (
      (selectedCategory.species === "All" ||
        selectedCategory.species === char.species) &&
      (selectedCategory.status === "All" ||
        selectedCategory.status === char.status)
    );
  });

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "origin-asc")
      return a.origin.name.localeCompare(b.origin.name);
    if (sortOption === "origin-desc")
      return b.origin.name.localeCompare(a.origin.name);
    return 0;
  });

  const charactersContext = {
    filteredCharacters: sortedCharacters,
    handleFilterCategory,
    selectedCategory,
    charData,
    loading,
    error,
    isLoading,
    ref,
    sortOption,
    handleSort,
  };

  return (
    <CharactersContext.Provider value={charactersContext}>
      {children}
    </CharactersContext.Provider>
  );
}

export default CharactersContext;

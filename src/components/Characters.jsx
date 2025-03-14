import { useContext } from "react";
import CharacterItem from "./CharacterItem";
import MessageStatus from "./MessageStatus";
import CharactersContext from "../store/CharactersContext";

const CharacterList = () => {
  const charactersContext = useContext(CharactersContext);

  const data = charactersContext.charData;

  console.log(charactersContext.selectedCategory);
  console.log("chardata", data);
  console.log("filteredchar", charactersContext.filteredCharacters);

  if (charactersContext.loading) return <MessageStatus message="Loading..." />;
  if (charactersContext.error)
    return <MessageStatus message={charactersContext.error.message} />;

  return (
    <>
      <div className="characters-list">
        {charactersContext.filteredCharacters?.length !== 0 &&
          charactersContext.filteredCharacters?.map((character, index) => (
            <div
              key={index}
              ref={index === data.length - 1 ? charactersContext.ref : null}
            >
              <CharacterItem character={character} />
            </div>
          ))}
      </div>
      {charactersContext.filteredCharacters?.length === 0 && (
        <MessageStatus message="No items found!" />
      )}

      {(charactersContext.loading || charactersContext.isLoading) && (
        <MessageStatus message="Loading more characters..." />
      )}
    </>
  );
};

export default CharacterList;

import { useTranslation } from "react-i18next";

export default function CharacterItem({ character }) {
  const { t } = useTranslation()

    let cssClassStatus = "";
    if(character.status === 'Alive') {
        cssClassStatus = 'alive-status'
    } else if(character.status === 'Dead') {
        cssClassStatus = 'dead-status'
    } else {
        cssClassStatus = 'unknown-status'
    }

  return (
    <li className="char-item">
      <img src={character.image} alt={character.name} />
      <div className="char-item-info">
        <h2>{character.name}</h2>
        <h4 className={cssClassStatus}>
        {t(`status.${character.status}`)} - {t(`species.${character.species}`)}
        </h4>
        <div>
          <p>{t("gender.title")}:</p>
          <p>{t(`gender.${character.gender}`)}</p>
        </div>
        <div>
          <p>{t("origin")}:</p>
          <p>{character.origin.name}</p>
        </div>
      </div>
    </li>
  );
}

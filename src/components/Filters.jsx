import { useTranslation } from "react-i18next";
import { useContext } from "react";

import CharactersContext from "../store/CharactersContext";
import LanguageSelector from "./LanguageSelector";

export default function Filters() {
  const { t } = useTranslation();
  const charactersContext = useContext(CharactersContext);

  return (
    <div className="filters-langSelect">
      <div className="filters">
        <label htmlFor="filterBySpecies">{t("filterBySpecies")}: </label>
        <select
          id="filterBySpecies"
          name="species"
          value={charactersContext.selectedCategory.species}
          onChange={charactersContext.handleFilterCategory}
        >
          <option value="All">{t("all")}</option>
          <option value="Human">{t("species.Human")}</option>
          <option value="Alien">{t("species.Alien")}</option>
          <option value="Humanoid">{t("species.Humanoid")}</option>
          <option value="unknown">{t("species.unknown")}</option>
          <option value="Robot">{t("species.Robot")}</option>
          <option value="Animal">{t("species.Animal")}</option>
          <option value="Disease">{t("species.Disease")}</option>
          <option value="Poopybutthole">{t("species.Poopybutthole")}</option>
          <option value="Mythological Creature">
            {t("species.Mythological Creature")}
          </option>
        </select>

        <label htmlFor="filterByStatus">{t("filterByStatus")}: </label>
        <select
          id="filterByStatus"
          name="status"
          value={charactersContext.selectedCategory.status}
          onChange={charactersContext.handleFilterCategory}
        >
          <option value="All">{t("all")}</option>
          <option value="Alive">{t("status.Alive")}</option>
          <option value="Dead">{t("status.Dead")}</option>
          <option value="unknown">{t("status.unknown")}</option>
        </select>

        <label htmlFor="sortBy">{t("sortBy")}: </label>
        <select
          id="sortBy"
          value={charactersContext.sortOption}
          onChange={charactersContext.handleSort}
        >
          <option value="default">{t("sort.default")}</option>
          <option value="name-asc">{t("sort.nameAsc")}</option>
          <option value="name-desc">{t("sort.nameDesc")}</option>
          <option value="origin-asc">{t("sort.originAsc")}</option>
          <option value="origin-desc">{t("sort.originDesc")}</option>
        </select>
      </div>
      <LanguageSelector />
    </div>
  );
}

import { useTranslation } from "react-i18next";
import translationImg from "../image/translation-icon.png"

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  function handleSelectLang(event) {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div className="lang-selector">
      <select onChange={handleSelectLang} value={i18n.language}>
        <option value="en">English</option>
        <option value="de">Deutch</option>
      </select>
      <img src={translationImg} alt="Translation img" width="50px" />
    </div>
  );
}

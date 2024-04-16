import { I18n } from "i18n-js";
import langs from "../../constants//languages/langs.json";

const i18n = new I18n(langs);

i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n;
import { useMemo, useState } from "react";
import "./App.css";
import {
  DecimalExpansion,
  DecimalNotationFormat,
} from "./components/DecimalExpansion";

const fractions = [
  [2, 3],
  [9, 11],
  [7, 12],
  [1, 81],
  [22, 7],
  [593, 53],
  [1234, 1235],
];

const regions = [
  ["ps-AF", "Afghanistan"],
  ["sv-AX", "Åland Islands"],
  ["sq-AL", "Albania"],
  ["ar-DZ", "Algeria"],
  ["en-AS", "American Samoa"],
  ["ca-AD", "Andorra"],
  ["pt-AO", "Angola"],
  ["en-AI", "Anguilla"],
  ["en-AQ", "Antarctica"],
  ["en-AG", "Antigua and Barbuda"],
  ["es-AR", "Argentina"],
  ["hy-AM", "Armenia"],
  ["nl-AW", "Aruba"],
  ["en-AU", "Australia"],
  ["de-AT", "Austria"],
  ["az-AZ", "Azerbaijan"],
  ["en-BS", "Bahamas"],
  ["ar-BH", "Bahrain"],
  ["bn-BD", "Bangladesh"],
  ["en-BB", "Barbados"],
  ["be-BY", "Belarus"],
  ["nl-BE", "Belgium"],
  ["en-BZ", "Belize"],
  ["fr-BJ", "Benin"],
  ["en-BM", "Bermuda"],
  ["dz-BT", "Bhutan"],
  ["es-BO", "Bolivia"],
  ["nl-BQ", "Bonaire, Sint Eustatius and Saba"],
  ["bs-BA", "Bosnia and Herzegovina"],
  ["en-BW", "Botswana"],
  ["en-BV", "Bouvet Island"],
  ["pt-BR", "Brazil"],
  ["en-IO", "British Indian Ocean Territory"],
  ["ms-BN", "Brunei Darussalam"],
  ["bg-BG", "Bulgaria"],
  ["fr-BF", "Burkina Faso"],
  ["fr-BI", "Burundi"],
  ["pt-CV", "Cabo Verde"],
  ["km-KH", "Cambodia"],
  ["fr-CM", "Cameroon"],
  ["en-CA", "Canada"],
  ["en-KY", "Cayman Islands"],
  ["fr-CF", "Central African Republic"],
  ["fr-TD", "Chad"],
  ["es-CL", "Chile"],
  ["zh-CN", "China"],
  ["en-CX", "Christmas Island"],
  ["en-CC", "Cocos (Keeling) Islands"],
  ["es-CO", "Colombia"],
  ["ar-KM", "Comoros"],
  ["fr-CG", "Congo"],
  ["fr-CD", "Congo (Democratic Republic)"],
  ["en-CK", "Cook Islands"],
  ["es-CR", "Costa Rica"],
  ["fr-CI", "Côte d'Ivoire"],
  ["hr-HR", "Croatia"],
  ["es-CU", "Cuba"],
  ["nl-CW", "Curaçao"],
  ["el-CY", "Cyprus"],
  ["cs-CZ", "Czech Republic"],
  ["da-DK", "Denmark"],
  ["ar-DJ", "Djibouti"],
  ["en-DM", "Dominica"],
  ["es-DO", "Dominican Republic"],
  ["es-EC", "Ecuador"],
  ["ar-EG", "Egypt"],
  ["es-SV", "El Salvador"],
  ["es-GQ", "Equatorial Guinea"],
  ["ti-ER", "Eritrea"],
  ["et-EE", "Estonia"],
  ["en-SZ", "Eswatini"],
  ["am-ET", "Ethiopia"],
  ["en-FK", "Falkland Islands"],
  ["fo-FO", "Faroe Islands"],
  ["en-FJ", "Fiji"],
  ["fi-FI", "Finland"],
  ["fr-FR", "France"],
  ["fr-GF", "French Guiana"],
  ["fr-PF", "French Polynesia"],
  ["fr-TF", "French Southern Territories"],
  ["fr-GA", "Gabon"],
  ["en-GM", "Gambia"],
  ["ka-GE", "Georgia"],
  ["de-DE", "Germany"],
  ["en-GH", "Ghana"],
  ["en-GI", "Gibraltar"],
  ["el-GR", "Greece"],
  ["kl-GL", "Greenland"],
  ["en-GD", "Grenada"],
  ["fr-GP", "Guadeloupe"],
  ["en-GU", "Guam"],
  ["es-GT", "Guatemala"],
  ["en-GG", "Guernsey"],
  ["fr-GN", "Guinea"],
  ["pt-GW", "Guinea-Bissau"],
  ["en-GY", "Guyana"],
  ["ht-HT", "Haiti"],
  ["en-HM", "Heard Island and McDonald Islands"],
  ["la-VA", "Holy See"],
  ["es-HN", "Honduras"],
  ["zh-HK", "Hong Kong"],
  ["hu-HU", "Hungary"],
  ["is-IS", "Iceland"],
  ["hi-IN", "India"],
  ["id-ID", "Indonesia"],
  ["fa-IR", "Iran"],
  ["ar-IQ", "Iraq"],
  ["en-IE", "Ireland"],
  ["en-IM", "Isle of Man"],
  ["he-IL", "Israel"],
  ["it-IT", "Italy"],
  ["en-JM", "Jamaica"],
  ["ja-JP", "Japan"],
  ["en-JE", "Jersey"],
  ["ar-JO", "Jordan"],
  ["kk-KZ", "Kazakhstan"],
  ["en-KE", "Kenya"],
  ["en-KI", "Kiribati"],
  ["ko-KP", "Korea (North)"],
  ["ko-KR", "Korea (South)"],
  ["ar-KW", "Kuwait"],
  ["ky-KG", "Kyrgyzstan"],
  ["lo-LA", "Lao People's Democratic Republic"],
  ["lv-LV", "Latvia"],
  ["ar-LB", "Lebanon"],
  ["en-LS", "Lesotho"],
  ["en-LR", "Liberia"],
  ["ar-LY", "Libya"],
  ["de-LI", "Liechtenstein"],
  ["lt-LT", "Lithuania"],
  ["fr-LU", "Luxembourg"],
  ["zh-MO", "Macao"],
  ["mg-MG", "Madagascar"],
  ["en-MW", "Malawi"],
  ["ms-MY", "Malaysia"],
  ["dv-MV", "Maldives"],
  ["fr-ML", "Mali"],
  ["mt-MT", "Malta"],
  ["en-MH", "Marshall Islands"],
  ["fr-MQ", "Martinique"],
  ["ar-MR", "Mauritania"],
  ["en-MU", "Mauritius"],
  ["fr-YT", "Mayotte"],
  ["es-MX", "Mexico"],
  ["en-FM", "Micronesia"],
  ["ro-MD", "Moldova"],
  ["fr-MC", "Monaco"],
  ["mn-MN", "Mongolia"],
  ["sr-ME", "Montenegro"],
  ["en-MS", "Montserrat"],
  ["ar-MA", "Morocco"],
  ["pt-MZ", "Mozambique"],
  ["my-MM", "Myanmar"],
  ["en-NA", "Namibia"],
  ["en-NR", "Nauru"],
  ["ne-NP", "Nepal"],
  ["nl-NL", "Netherlands"],
  ["fr-NC", "New Caledonia"],
  ["en-NZ", "New Zealand"],
  ["es-NI", "Nicaragua"],
  ["fr-NE", "Niger"],
  ["en-NG", "Nigeria"],
  ["en-NU", "Niue"],
  ["en-NF", "Norfolk Island"],
  ["mk-MK", "North Macedonia"],
  ["en-MP", "Northern Mariana Islands"],
  ["no-NO", "Norway"],
  ["ar-OM", "Oman"],
  ["ur-PK", "Pakistan"],
  ["en-PW", "Palau"],
  ["ar-PS", "Palestine, State of"],
  ["es-PA", "Panama"],
  ["en-PG", "Papua New Guinea"],
  ["es-PY", "Paraguay"],
  ["es-PE", "Peru"],
  ["en-PH", "Philippines"],
  ["en-PN", "Pitcairn"],
  ["pl-PL", "Poland"],
  ["pt-PT", "Portugal"],
  ["es-PR", "Puerto Rico"],
  ["ar-QA", "Qatar"],
  ["fr-RE", "Réunion"],
  ["ro-RO", "Romania"],
  ["ru-RU", "Russian Federation"],
  ["rw-RW", "Rwanda"],
  ["fr-BL", "Saint Barthélemy"],
  ["en-SH", "Saint Helena"],
  ["en-KN", "Saint Kitts and Nevis"],
  ["en-LC", "Saint Lucia"],
  ["fr-MF", "Saint Martin (French part)"],
  ["fr-PM", "Saint Pierre and Miquelon"],
  ["en-VC", "Saint Vincent and the Grenadines"],
  ["sm-WS", "Samoa"],
  ["it-SM", "San Marino"],
  ["pt-ST", "Sao Tome and Principe"],
  ["ar-SA", "Saudi Arabia"],
  ["fr-SN", "Senegal"],
  ["sr-RS", "Serbia"],
  ["en-SC", "Seychelles"],
  ["en-SL", "Sierra Leone"],
  ["en-SG", "Singapore"],
  ["nl-SX", "Sint Maarten (Dutch part)"],
  ["sk-SK", "Slovakia"],
  ["sl-SI", "Slovenia"],
  ["en-SB", "Solomon Islands"],
  ["so-SO", "Somalia"],
  ["en-ZA", "South Africa"],
  ["en-GS", "South Georgia and the South Sandwich Islands"],
  ["en-SS", "South Sudan"],
  ["es-ES", "Spain"],
  ["si-LK", "Sri Lanka"],
  ["ar-SD", "Sudan"],
  ["nl-SR", "Suriname"],
  ["no-SJ", "Svalbard and Jan Mayen"],
  ["sv-SE", "Sweden"],
  ["de-CH", "Switzerland"],
  ["ar-SY", "Syrian Arab Republic"],
  ["zh-TW", "Taiwan"],
  ["tg-TJ", "Tajikistan"],
  ["sw-TZ", "Tanzania"],
  ["th-TH", "Thailand"],
  ["pt-TL", "Timor-Leste"],
  ["fr-TG", "Togo"],
  ["en-TK", "Tokelau"],
  ["to-TO", "Tonga"],
  ["en-TT", "Trinidad and Tobago"],
  ["ar-TN", "Tunisia"],
  ["tr-TR", "Turkey"],
  ["tk-TM", "Turkmenistan"],
  ["en-TC", "Turks and Caicos Islands"],
  ["en-TV", "Tuvalu"],
  ["en-UG", "Uganda"],
  ["uk-UA", "Ukraine"],
  ["ar-AE", "United Arab Emirates"],
  ["en-GB", "United Kingdom"],
  ["en-US", "United States"],
  ["en-UM", "United States Minor Outlying Islands"],
  ["es-UY", "Uruguay"],
  ["uz-UZ", "Uzbekistan"],
  ["en-VU", "Vanuatu"],
  ["es-VE", "Venezuela"],
  ["vi-VN", "Viet Nam"],
  ["en-VG", "Virgin Islands (British)"],
  ["en-VI", "Virgin Islands (U.S.)"],
  ["fr-WF", "Wallis and Futuna"],
  ["ar-EH", "Western Sahara"],
  ["ar-YE", "Yemen"],
  ["en-ZM", "Zambia"],
  ["en-ZW", "Zimbabwe"],
];

// all from 1/2 to 1/60
const moreFractions = (() => {
  const fractions: [number, number][] = [];
  for (let i = 2; i <= 60; i++) {
    fractions.push([1, i]);
  }
  return fractions;
})();

function App() {
  const [numerator, setNumerator] = useState("1234");
  const [denominator, setDenominator] = useState("1235");
  const [tag, setTag] = useState("");
  const [format, setFormat] = useState("");
  const [defaultFormat, setDefaultFormat] = useState(format);

  const defaultRegion = useMemo(() => {
    return new Intl.Locale(navigator.language).region;
  }, []);

  const demoFractions = [...fractions, ...moreFractions];

  return (
    <>
      <h1>Decimal Expansion with Recurring Decimals</h1>
      <input
        type="number"
        value={numerator}
        onChange={(e) => setNumerator(e.target.value)}
      />{" "}
      /{" "}
      <input
        type="number"
        value={denominator}
        onChange={(e) => setDenominator(e.target.value)}
      />
      <br />
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="">Default ({defaultRegion})</option>
        {regions.map(([tag, label]) => (
          <option key={tag} value={tag}>
            {label}
          </option>
        ))}
      </select>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="">Default ({defaultFormat})</option>
        <option value="vinculum">Vinculum</option>
        <option value="dots">Dots</option>
        <option value="parentheses">Parentheses</option>
        <option value="arc">Arc</option>
        <option value="ellipsis">Ellipsis</option>
        <option value="rounded">Rounded</option>
      </select>
      <p>
        <strong>Floating Point Value</strong>:{" "}
        {Number(numerator) / Number(denominator)}
      </p>
      <p>
        <strong>Decimal Expansion</strong>:
        <DecimalExpansion
          numerator={Number(numerator)}
          denominator={Number(denominator)}
          options={{
            tag: tag || undefined,
            format: (format as DecimalNotationFormat) || undefined,
          }}
          onFormatChange={(newFormat) => setDefaultFormat(newFormat)}
        />
      </p>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Fraction</th>
            <th>Vinculum</th>
            <th>Dots</th>
            <th>Parentheses</th>
            <th>Arc</th>
            <th>Ellipsis</th>
            <th>Rounded</th>
          </tr>
        </thead>
        <tbody>
          {demoFractions.map(([numerator, denominator]) => (
            <tr key={`${numerator}/${denominator}`}>
              <td>
                {numerator}/{denominator}
              </td>
              <td>
                <span>
                  <DecimalExpansion
                    numerator={numerator}
                    denominator={denominator}
                    options={{ format: "vinculum" }}
                  />
                </span>
              </td>
              <td>
                <span>
                  <DecimalExpansion
                    numerator={numerator}
                    denominator={denominator}
                    options={{ format: "dots" }}
                  />
                </span>
              </td>
              <td>
                <span>
                  <DecimalExpansion
                    numerator={numerator}
                    denominator={denominator}
                    options={{ format: "parentheses" }}
                  />
                </span>
              </td>
              <td>
                <span>
                  <DecimalExpansion
                    numerator={numerator}
                    denominator={denominator}
                    options={{ format: "arc" }}
                  />
                </span>
              </td>
              <td>
                <span>
                  <DecimalExpansion
                    numerator={numerator}
                    denominator={denominator}
                    options={{ format: "ellipsis" }}
                  />
                </span>
              </td>
              <td>
                <span>
                  <DecimalExpansion
                    numerator={numerator}
                    denominator={denominator}
                    options={{ format: "rounded" }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;

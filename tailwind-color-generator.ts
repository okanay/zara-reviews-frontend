type HexColorObject = {
  [key: string]: string;
};

type ColorMode = "light" | "dark";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function convertHexToTailwindRgb(
  hexObject: HexColorObject,
  prefix: string = "primary",
  mode: ColorMode = "light",
): string {
  let output = "";

  const sortedKeys = Object.keys(hexObject).sort(
    (a, b) => Number(a) - Number(b),
  );

  sortedKeys.forEach((key, index) => {
    const hexValue = hexObject[key];
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      const colorKey =
        mode === "dark" ? sortedKeys[sortedKeys.length - 1 - index] : key;
      output += `--${prefix}-${colorKey}: ${rgb.r} ${rgb.g} ${rgb.b};\n`;
    }
  });

  return output;
}

// Örnek kullanım
const colorObject: HexColorObject = {
  "50": "#faf6fe",
  "100": "#f2ebfc",
  "200": "#e8dafa",
  "300": "#d6bdf5",
  "400": "#bd93ed",
  "500": "#a469e3",
  "600": "#8d49d4",
  "700": "#7837b9",
  "800": "#653198",
  "900": "#53297a",
  "950": "#381259",
};

console.log(convertHexToTailwindRgb(colorObject, "primary", "light"));

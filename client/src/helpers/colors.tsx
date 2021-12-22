//top 100 pallettes
import colors from "nice-color-palettes";
//there are also packages for top 200, 500, and 1000 pallettes

export const randomColors = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

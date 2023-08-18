/**
 * useTheme
 * @param {HTMLElement | null} target - The target HTML element to apply the theme.
 * @param {Theme} theme - The theme object containing various color properties.
 *
 * Theme object properties:
 * @property {string} backgroundColor - The background color.
 * @property {string} thumbnailBgColor - The thumbnail background color.
 * @property {string} controlBgColor - The control background color.
 * @property {string} controlBtnColor - The control button color.
 * @property {string} controlsBackDropColor - The controls backdrop color.
 * @property {string} primaryColor - The primary color.
 *
 * This hook applies the provided theme to the target HTML element.
 */
import { useEffect } from "react";
import { Theme } from "../react-visual-grid";

export default function useTheme(target: HTMLElement | null, theme?: Theme) {
  useEffect(() => {
    // Check if both theme and target are provided
    if (theme && target) {
      const {
        backgroundColor,
        thumbnailBgColor,
        controlBgColor,
        controlBtnColor,
        controlsBackDropColor,
        primaryColor,
      } = theme;

      // Construct a style object with CSS custom properties
      const style: { [key: string]: string } = {
        "--rcvg-bg-color": backgroundColor,
        "--rcvg-control-btn-color": controlBtnColor,
        "--rcvg-controls-backdrop-color": controlsBackDropColor,
        "--rcvg-controls-bg-color": controlBgColor,
        "--rcvg-primary-color": primaryColor,
        "--rcvg-thumbnail-bg-color": thumbnailBgColor,
      };

      // Convert the style object to a CSS string and append to the target element's CSS
      target.style.cssText += Object.keys(style)
        .map((prop) => `${prop}: ${style[prop]};`)
        .join("");
    }
  }, [theme, target]); // Dependency array to ensure the effect runs when theme or target changes
}

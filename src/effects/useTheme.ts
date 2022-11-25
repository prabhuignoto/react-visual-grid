import { useEffect } from "react";
import { Theme } from "../react-visual-grid";

export default function useTheme(target: HTMLElement | null, theme?: Theme) {
  useEffect(() => {
    if (theme && target) {
      const {
        backgroundColor,
        thumbnailBgColor,
        controlBgColor,
        controlBtnColor,
        controlsBackDropColor,
        primaryColor,
      } = theme;

      const style: { [key: string]: string } = {
        "--rcvg-bg-color": backgroundColor,
        "--rcvg-control-btn-color": controlBtnColor,
        "--rcvg-controls-backdrop-color": controlsBackDropColor,
        "--rcvg-controls-bg-color": controlBgColor,
        "--rcvg-primary-color": primaryColor,
        "--rcvg-thumbnail-bg-color": thumbnailBgColor,
      };

      target.style.cssText += Object.keys(style)
        .map((prop) => `${prop}: ${style[prop]};`)
        .join("");
    }
  }, [theme, target]);
}

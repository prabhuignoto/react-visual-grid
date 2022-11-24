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
        "--rc-v-grid-bg-color": backgroundColor,
        "--rc-v-grid-control-btn-color": controlBtnColor,
        "--rc-v-grid-controls-backdrop-color": controlsBackDropColor,
        "--rc-v-grid-controls-bg-color": controlBgColor,
        "--rc-v-grid-primary-color": primaryColor,
        "--rc-v-grid-thumbnail-bg-color": thumbnailBgColor,
      };

      target.style.cssText += Object.keys(style)
        .map((prop) => `${prop}: ${style[prop]};`)
        .join("");
    }
  }, [theme, target]);
}

<p align="center">
  <a href="" rel="noopener">
 <!-- <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a> -->
</p>

<h3 align="center">react-visual-grid</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> ⚡ The Powerful Visual grid / Gallery generator you always wanted
    <br> 
</p>

- [⚡ Features <a name = "about"></a>](#-features-)
- [🎥 Demo <a name = "demo"></a>](#-demo-)
- [💭 How it works <a name = "working"></a>](#-how-it-works-)
- [⚙️ Installation <a name = "installation"></a>](#️-installation-)
- [🍵 Usage <a name = "usage"></a>](#-usage-)
- [🍫 Props <a name = "props"></a>](#-props-)
- [🍵 Example 1 (Horizontal) <a name = "horizontal"></a>](#-example-1-horizontal-)
- [🍵 Example 2 (Vertical) <a name = "vertical"></a>](#-example-2-vertical-)
- [⛏️ Built Using <a name = "built_using"></a>](#️-built-using-)
- [✍️ Authors <a name = "authors"></a>](#️-authors-)

## ⚡ Features <a name = "about"></a>

- Generate image grids quickly and easily. Just provide a list of image URLs and the gallery will be generated for you.
- Inbuilt smart virtualization for improved performance.
- Load thousands of images without worrying about performance.
- UI Controls for customizing the image sizes on the fly. Image sizes can be changed from 1x to 3x and the sizes are completely customizable.
- Render images in a grid horizontally or vertically.
- Built with Typescript
- Easy to understand API and completely configurable react component.

## 🎥 Demo <a name = "demo"></a>

![demo](demo.png)

## 💭 How it works <a name = "working"></a>

`react-visual-grid` works on a bare minimum of props and automatically figures out the best way to render the images in a grid. It does this by calculating the width of the container and the number of images that can be rendered in a row. It then calculates the height of each image based on the width of the image and the aspect ratio of the image. It then renders the images in a grid.

The component also comes with a virtualization feature which allows you to render only the images that are visible on the screen. This allows you to render thousands of images without worrying about performance.

## ⚙️ Installation <a name = "installation"></a>

You can install `react-visual-grid` using npm or yarn.

```bash
  npm install react-visual-grid
```

```bash
  yarn add react-visual-grid
```

## 🍵 Usage <a name = "usage"></a>

Gallery can be generated in two modes: Horizontal and Vertical. Depending on the mode, the images are rendered in col. The default mode is `vertical`

```js
import { Gallery } from "react-visual-grid";

// generate random images using lorem picsum service
const images = Array.from({ length: 50 }, (_, i) => ({
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
  alt: `Image ${i + 1}`,
}));

const App = () => {
  return <Gallery images={images} mode="auto" width={1800} height={1200} />;
};
```

## 🍫 Props <a name = "props"></a>

| Name       | Description                                                                               | Type   | Default    |
| :--------- | :---------------------------------------------------------------------------------------- | :----- | :--------- |
| scrollDir  | Direction to render the images. can be `horizontal` or `vertical`                         | string | `vertical` |
| images     | Collection of Images to be rendered                                                       | Object | []         |
| width      | Width of the Grid                                                                         | number | 1200       |
| height     | Height of the Grid                                                                        | number | 600        |
| gap        | Gap in pixels between the images                                                          | number | 20         |
| mode       | Configures the rendering mode. set mode to `manual` to render the columns / rows manually | string | `auto`     |
| imageSizes | Configures the zoom sizes of the Images                                                   | Object |            |

## 🍵 Example 1 (Horizontal) <a name = "horizontal"></a>

```js
import { Gallery } from "react-visual-grid";

const App = () => {
  return (
    <Gallery
      images={images}
      scrollDir="horizontal"
      width={1800}
      height={1200}
    />
  );
};
```

## 🍵 Example 2 (Vertical) <a name = "vertical"></a>

```js
import { Gallery } from "react-visual-grid";

const App = () => {
  return (
    <Gallery images={images} scrollDir="vertical" width={1800} height={1200} />
  );
};
```

## ⛏️ Built Using <a name = "built_using"></a>

- [typescript](https://www.typescriptlang.org/)
- [react](https://reactjs.org/)
- [classNames](https://jedwatson.github.io/classnames/)
- [nanoid](https://github.com/ai/nanoid)

## ✍️ Authors <a name = "authors"></a>

- [@prabhuignoto](https://github.com/prabhuignoto) - Idea & Initial work

// By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL

export default function spinner() {
  return (
    <svg height="24" viewBox="0 0 24 24" width="24">
      <defs>
        <linearGradient id="a" x1="8.042%" x2="65.682%" y1="0%" y2="23.865%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="63.146%" stopColor="#fff" stopOpacity=".631" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              dur="0.9s"
              from="0 18 18"
              repeatCount="indefinite"
              to="360 18 18"
              type="rotate"
            />
          </path>
          <circle cx="36" cy="18" fill="#fff" r="1">
            <animateTransform
              attributeName="transform"
              dur="0.9s"
              from="0 18 18"
              repeatCount="indefinite"
              to="360 18 18"
              type="rotate"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

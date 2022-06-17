import { css, Global } from '@emotion/react';
import { theme } from '@gilbarbara/components';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }

        html {
          font-size: 62.5%;
          -webkit-font-smoothing: antialiased;
          height: 100%;
        }

        body {
          background-color: ${theme.white};
          color: ${theme.darkColor};
          font-family: Rubik, sans-serif;
          font-size: ${theme.typography.regular.fontSize};
          margin: 0;
          min-height: 100vh;
          padding: 0;
        }

        button:focus {
          outline: black auto 1px;
        }

        img {
          height: auto;
          max-width: 100%;
        }

        a {
          color: ${theme.colors.primary};
          text-decoration: underline;

          &.disabled {
            pointer-events: none;
          }
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 50000s ease-in-out 0s, color 5000s ease-in-out 0s;
        }

        .github-corner {
          position: fixed;
          top: 0;
          right: 0;

          svg {
            fill: #000;
            color: #fff;
          }

          .octo-arm {
            transform-origin: 130px 106px;
          }

          &:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
          }
        }

        @keyframes octocat-wave {
          0%,
          100% {
            transform: rotate(0);
          }
          20%,
          60% {
            transform: rotate(-25deg);
          }
          40%,
          80% {
            transform: rotate(10deg);
          }
        }

        @media (max-width: 500px) {
          .github-corner:hover .octo-arm {
            animation: none;
          }

          .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
          }
        }
      `}
    />
  );
}

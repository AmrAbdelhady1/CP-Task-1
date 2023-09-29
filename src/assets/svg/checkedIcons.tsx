export const CheckedSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <rect width="18" height="18" rx="4" fill="#087B2F" />
      <path
        d="M5 10.0303L7.5 12L13 7"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const UnCheckedSvg = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="17"
        height="17"
        rx="3.5"
        fill="white"
        stroke="#D4D9E4"
      />
    </svg>
  );
};

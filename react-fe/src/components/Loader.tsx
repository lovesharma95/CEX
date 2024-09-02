const Loader = () => {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 z-[1000000] h-full w-full -translate-x-1/2 -translate-y-1/2 bg-transparent">
        <div className="flex h-full w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="80px"
            height="80px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#5F1A89"
              strokeWidth="9"
              r="40"
              strokeDasharray="188.49555921538757 64.83185307179586"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import React from "react";

function Greeting({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex p-12">
      <img
        src={image}
        alt="profile image"
        className="rounded-full w-16 h-16 mr-4"
      />
      <div className="text-2xl font-bold flex flex-col justify-center">
        Welcome back, {name}
      </div>
    </div>
  );
}

export default Greeting;

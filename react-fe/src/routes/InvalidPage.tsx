function InvalidPage() {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 z-[1000000] h-full w-full -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex h-full w-full items-center justify-center text-xl font-bold md:text-5xl">
          PAGE NOT FOUND
        </div>
      </div>
    </div>
  );
}

export default InvalidPage;

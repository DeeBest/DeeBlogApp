const FeaturedPosts = () => {
  return (
    <section className="flex flex-col items-center bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-300 p-1 col-span-2 row-span-2 rounded-md">
      <h1 className="text-slate-400 text-2xl italic self-end font-extrabold">
        Featured Posts
      </h1>
      <hr className="w-1/3 h-[4px] bg-rose-400 rounded-md self-end" />
      <hr className="w-1/3 h-[4px] bg-slate-400 rounded-md my-1 -mr-36" />
      <hr className="w-1/3 h-[4px] bg-rose-400 rounded-md self-end" />
    </section>
  );
};
export default FeaturedPosts;

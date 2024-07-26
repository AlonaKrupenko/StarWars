import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1 className="text-xl text-center my-4">
        Explore the Star Wars Universe
      </h1>
      <p className="mb-4">
        Navigate to the heroes list page to discover all the characters from the
        Star Wars universe.
      </p>
      <p className="mb-6">
        Click on any hero to view detailed information about them, including a
        graph showing the films they appeared in and the starships they piloted.
      </p>
      <div className="flex items-center justify-center">
        <Link href={`heroesList`}>
          <button className="text-center bg-yellow-300 hover:bg-yellow-400 py-2 px-4 border border-yellow-300 hover:border-yellow-400 rounded">
            GO TO LIST
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;

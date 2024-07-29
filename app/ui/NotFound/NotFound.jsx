import Link from "next/link";

/**
 * Component that displays a "Not Found" message with a link to the heroes list.
 * @returns {JSX.Element} The rendered not found component.
 */
const NotFound = () => {
  return (
    <div className="global">
      <h2 className="text-center text-xl my-4">Not Found</h2>
      <p className="text-center text-xl my-4">
        Could not find requested resource
      </p>
      <Link href="/heroesList/" className="text-center block">
        <button className="text-center bg-yellow-300 hover:bg-yellow-400 py-2 px-4 border border-yellow-300 hover:border-yellow-400 rounded">
          Go TO LIST
        </button>
      </Link>
    </div>
  );
};

export default NotFound;

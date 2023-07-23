import LoadingOverlay from "react-loading-overlay";

export default function Loader() {
  return (
    <div className="h-full fixed w-full top-0 left-0 text-center z-50 bg-gray-900 bg-opacity-50 py-52">
      <LoadingOverlay
        active={true}
        spinner
        text={<p className="font-bold">Please wait...</p>}
      />
    </div>
  );
}

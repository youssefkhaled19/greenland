import { useEffect, useState } from "react";

// Loader component
function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function Upload() {
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState(null);
  const [loading, setLoading] = useState(false);

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  useEffect(() => {
    if (!file) return;

    async function getBase64() {
      setLoading(true);
      try {
        const base64 = await convertFileToBase64(file);
        setBase64File(base64);
        console.log(base64);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getBase64();
  }, [file]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center text-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl h-[480px] w-[400px] rounded-2xl p-8">
        <h1 className="font-bold text-2xl text-white mb-4">Upload Your PDF</h1>

        <p className="text-gray-300 text-sm mb-6">
          Turn your PDF into an interactive quiz — instantly.
        </p>

        {loading ? (
          <Loader />
        ) : !file ? (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-300 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 16v-8m0 0l-4 4m4-4l4 4m2 4h-2a2 2 0 01-2-2H10a2 2 0 01-2 2H6a2 2 0 01-2-2v-1m16 1V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8"
              />
            </svg>
            <span className="text-gray-300 text-sm px-2">
              Drag & drop your PDF or click to upload
            </span>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-green-400 rounded-xl bg-white/10 p-4">
            <p className="text-green-300 font-semibold mb-2">
              File Uploaded Successfully!
            </p>
            <p className="text-gray-300 text-sm">{file.name}</p>
          </div>
        )}

        <button
          disabled={!base64File || loading}
          className={`mt-8 w-full ${
            base64File && !loading
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"
          } text-white font-semibold py-2.5 rounded-lg shadow-lg transition duration-200`}
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}

export default Upload;

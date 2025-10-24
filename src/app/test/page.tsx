export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-lg text-gray-600 mb-8">This is a minimal test page</p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-green-600 font-semibold">✅ Test page is working!</p>
        </div>
      </div>
    </div>
  );
}

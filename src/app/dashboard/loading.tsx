export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
} 
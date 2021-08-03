export default function Results({ numberOfPosts }) {
  return (
    <div>
      <div
        className={`pb-12  ${
          numberOfPosts > 0 ? "bg-gray-50" : "bg-white"
        } sm:pb-16`}
      >
        <div className="relative">
          <div className="absolute inset-0 h-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-gray-50 shadow-lg sm:grid sm:grid-cols-1">
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    ポスト
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-pink-600">
                    {numberOfPosts}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

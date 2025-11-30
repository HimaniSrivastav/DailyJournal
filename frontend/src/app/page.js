export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-10 py-16">
      {/* Left Section */}
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold leading-tight text-[#473472]">
           Reflect, Grow & <br /> Transform Yourself
        </h1>
        <p className="mt-5 text-gray-700 text-lg ">
          DailyJournal helps you track your thoughts, emotions, and progress.
          Write freely, reflect deeply, and build the best version of yourself.
        </p>
        <div className="mt-8 flex gap-4">
          <a
          href="/signup"
          className="px-3 py-6 bg-[#473472] text-white rounded-xl text-lg font-medium hover:bg-opacity-90 transition">
            Start Journaling
          </a>
          <a
          href="/login"
          className="px-6 py-6 border-2 border-[#473472] text-[#473472] rounded-xl text-lg font-medium hover:bg-[#473472] hover:text-white transition">
            Login
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-12 md:mt-0">
        <div className="w-[340px] h-[340px] rounded-3xl shadow-xl bg-gradient-to-br from-[#53629E] to-[#87BAC3] flex items-center justify-center">
          <h2 className="text-3xl font-semibold text-white">
            Your Journal<br />Your Space
          </h2>
        </div>
      </div>

    </div>
  );
}

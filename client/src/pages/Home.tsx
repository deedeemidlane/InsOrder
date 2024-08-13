import logo from "/logo.png";
import heroImg from "/hero.png";

function HomePage() {
  return (
    <>
      <header className="fixed top-0 w-full  z-30 bg-white-500 transition-all">
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <img className="h-12 w-auto" src={logo} alt="logo" />
            <span className="ml-2 hidden self-center whitespace-nowrap text-2xl sm:inline">
              Ins
            </span>
            <span className="hidden self-center whitespace-nowrap text-2xl font-bold sm:inline">
              Order
            </span>
          </div>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <a href="/login">
              <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-red-500 text-red-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-red-500 hover:text-white transition-all hover:shadow-lg hover:shadow-red-300">
                {" "}
                Đăng nhập
              </button>
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
        <div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              Trải nghiệm đặt món hoàn toán mới với <strong>InsOrder</strong>.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Hệ thống quản lý đơn hàng và hỗ trợ đặt hàng tại bàn.
            </p>
            <button className="py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-red-500 hover:shadow-xl hover:shadow-red-300 transition-all outline-none">
              Đăng ký ngay
            </button>
          </div>
          <div className="flex w-full">
            <img src={heroImg} alt="Hero image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

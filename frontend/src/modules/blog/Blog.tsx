import BlogCard from "./component/BlogCard";
import PageHeader from "../../components/global/PageHeader";

// Icons
import { IoIosSearch } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Apis
import { useListBlogsQuery } from "../../redux/features/blogApi";

// Interface
interface DataProps {
  data: {
    blogImage: string;
    category: string;
    title: string;
    createdAt: string;
    createdBy: { fullName: string };
  };
}
const Blog = () => {
  const { data: blogData } = useListBlogsQuery({});

  return (
    <main>
      {/* Page header section */}
      <section>
        <PageHeader title="Blog or News" breadCrumb="Blog" />
      </section>

      {/* Blog card section */}
      <section className="padding-inline padding-block">
        <div>
          {/* Search bar */}
          <div className=" items-end justify-end w-full md:flex sm:mb-[50px] mb-[40px]">
            <div className="">
              <label className="text-sm font-medium text-start text-white font-poppin mb-1.5 block">
                Search Blog
              </label>
              <div className="sm:w-[280px] w-full rounded-md border-color border h-[40px] relative">
                <input
                  type="text"
                  className="sm:w-[280px] w-full  h-full text-xs text-white bg-transparent border border-transparent rounded-md placeholder:text-xs placeholder:text-white ps-3 pe-8 focus:outline-none focus:border-green"
                  placeholder="Search..."
                />
                <span className="absolute text-white right-2 top-[50%] translate-y-[-50%] text-xl cursor-pointer">
                  <IoIosSearch />
                </span>
              </div>
            </div>
          </div>

          {/* Blog card */}
          <div className="grid grid-cols-12 gap-x-5 gap-y-8 mt-[50px]">
            {blogData?.data?.map((element: DataProps, index: number) => {
              return (
                <div
                  key={index}
                  className="lg:col-span-4 sm:col-span-6 col-span-full xl:col-span-3"
                >
                  <BlogCard data={element} />
                </div>
              );
            })}
            {/* Pagniation */}
            {blogData?.data.length > 10 && (
              <div className="flex items-center justify-center mt-8 col-span-full">
                <div className="flex items-center justify-center">
                  <button className="w-[40px] h-[40px] flex items-center justify-center rounded-tl-full rounded-bl-full border border-color text-sm text-slate  transitions hover:bg-green hover:border-green hover:text-white focus:bg-green focus:text-white focus:border-green">
                    <FaChevronLeft />
                  </button>
                  {[1, 2, 3, 4, 5].map((element: number, index: number) => {
                    return (
                      <button
                        key={index}
                        className="w-[40px] h-[40px] flex items-center justify-center  border border-color text-sm text-slate transitions hover:bg-green hover:border-green hover:text-white focus:bg-green focus:text-white focus:border-green"
                      >
                        {element}
                      </button>
                    );
                  })}
                  <button className="w-[40px] h-[40px] flex items-center justify-center rounded-tr-full rounded-br-full border border-color text-sm text-slate transitions hover:bg-green hover:border-green hover:text-white focus:bg-green focus:text-white focus:border-green">
                    {" "}
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;

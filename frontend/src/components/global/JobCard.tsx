import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

// Icons
import { FaRegBookmark } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

interface IJobProp {
  data: {
    _id: string;
    title: string;
    jobType: string;
    location: string;
    createdAt: string;
    salary: number;
  };
}

const JobCard = ({ data }: IJobProp) => {
  const isoDate = data?.createdAt || new Date().toISOString();
  const formattedDate = formatDistanceToNow(new Date(isoDate));

  return (
    <Link
      to={`/job-details/${data?._id}`}
      className="block w-full p-4 py-5 border border-gray-700 rounded-lg shadow-sm shadow-gray-600 transitions hover:shadow-lg hover:shadow-gray-700"
      onClick={() => {
        window.scroll({ top: 0 });
      }}
    >
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md justify-center h-[40px] w-[40px] border border-gray-700 shadow-md shadow-gray-700">
            <img src="/image/hero/img-1.png" className="w-[22px]" alt="" />
          </div>
          <h4 className="text-base font-medium leading-none text-white capitalize font-jakarta">
            {data?.title}
          </h4>
        </div>
        <button className="w-[30px] h-[30px] rounded-full border border-green text-green text-[13px] grid  place-content-center transitions hover:bg-green hover:text-white focus:bg-green focus:text-white bg-[#05966813]">
          <FaRegBookmark />
        </button>
      </div>

      {/* Date and salary section */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="m-1 text-[10px] mb-3 leading-none badge border-none px-2 badge-outline font-medium font-poppin  text-green transitions hover:bg-green hover:text-white focus:bg-green bg-[#05966813] focus:text-white">
            {data?.jobType}
          </p>
          <p className="flex items-center text-sm text-slate font-poppin gap-x-1">
            <IoLocationSharp /> {data?.location}
          </p>
        </div>
        <div>
          <p className="flex items-center mb-2 text-sm text-slate font-poppin gap-x-1">
            <FaRegClock /> {formattedDate} ago
          </p>
          <p className="text-sm leading-none text-white font-poppin text-end">
            {data?.salary} PKR
          </p>
        </div>
      </div>

      {/* Apply button */}
      <div className="mt-5">
        <button className="w-full primary-btn">Apply Now</button>
      </div>
    </Link>
  );
};

export default JobCard;

//loading skeleton will be shown until data is fetched
const LoadingSkeleton = ({ type }) => {
  if (type === "PostCard") {
    return (
      <div className="w-full bg-white rounded-2xl border border-content-border shadow-light">
        {/* content */}
        <div className="w-full p-4 gap-4 flex flex-row">
          {/* avatar loading */}
          <div className="w-[40px] relative min-w-[40px] h-[40px]">
            <div className="icon bg-shine w-full h-full rounded-full"></div>
          </div>
          <div className="flex w-full flex-col gap-3">
            {/* name and username */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-row">
                <p className="bg-shine h-[16px] w-[157px] rounded-md"></p>
              </div>
              <p className="bg-shine w-[74px] h-[14px] rounded-md"></p>
            </div>
            {/* card body text */}
            <div className="w-full flex gap-[6px] flex-col">
              <p className="bg-shine w-11/12 h-[14px] rounded-md"></p>
              <p className="bg-shine w-3/5  h-[14px] rounded-md"></p>
            </div>
            {/* post tags */}
            <div className="flex gap-3">
              {[0, 1, 2].map((tag) => (
                <p className="bg-shine w-[40px] h-[14px] rounded-md" key={tag}></p>
              ))}
            </div>
          </div>
        </div>
        {/* footer -> (likes, dislikes, views) */}
        <div className="w-full flex items-center flex-row  p-4 gap-6 border-t border-content-border">
          {[0, 1, 2].map((loadingReaction) => (
            <p
              className="bg-shine w-[40px] h-[19px] rounded-md"
              key={loadingReaction}
            ></p>
          ))}
        </div>
      </div>
    );
  }
};

export default LoadingSkeleton;

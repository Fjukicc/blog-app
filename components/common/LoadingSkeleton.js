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
                <p
                  className="bg-shine w-[40px] h-[14px] rounded-md"
                  key={tag}
                ></p>
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
  if (type === "UserCard") {
    return (
      <div className="w-full bg-white rounded-2xl border border-content-border shadow-light">
        {/* content */}
        <div className="w-full p-4 gap-4 flex flex-row">
          {/* avatar loading */}
          <div className="w-[40px] relative min-w-[40px] h-[40px]">
            <div className="icon bg-shine w-full h-full rounded-full"></div>
          </div>
          {/* name and username */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-row">
              <p className="bg-shine h-[16px] w-[122px] rounded-md"></p>
            </div>
            <p className="bg-shine w-[62px] h-[14px] rounded-md"></p>
          </div>
        </div>
      </div>
    );
  }
  if (type === "ProfileCardMobile") {
    return (
      <div className="w-full relative shadow-light rounded-xl flex flex-col bg-white border border-content-border">
        <div
          style={{ left: "calc(50% - 60px)" }}
          className="absolute -top-[30px] w-[120px] h-[120px] rounded-full border-[5px] border-white shadow-avatar"
        >
          <div className="icon bg-shine w-full h-full rounded-full"></div>
        </div>
        {/* upper gradient */}
        <div className="w-full h-16 custom-card-gradient-bg mb-6" />
        {/* card content */}
        <div className="w-full flex flex-col bg-white gap-6 p-6 items-center">
          {/* upper info */}
          <div className="w-full flex flex-col items-center gap-2">
            {/* full name */}
            <p className="bg-shine h-[30px] w-[227px] rounded-md"></p>
            {/* location and username and department */}
            <div className="flex w-full items-center flex-col gap-3">
              <p className="bg-shine h-[19px] w-[105px] rounded-md"></p>

              <div className="flex flex-row gap-1">
                <p className="bg-shine h-[19px] w-[159px] rounded-md"></p>
              </div>
              <div className="bg-shine py-[6px] px-3 rounded-xl text-center max-w-fit">
                <p className="bg-shine h-[28px] w-[129px] rounded-md"></p>
              </div>
            </div>
          </div>
          {/* post statistics */}
          <div className="flex flex-row w-full justify-center gap-6">
            <div className="flex flex-col items-center gap-[2px]">
              <p className="bg-shine h-[24px] w-[80px] rounded-md"></p>
              <p className="bg-shine h-[14px] w-[46px] rounded-md"></p>
            </div>
            <div className="flex flex-col items-center gap-[2px]">
              <p className="bg-shine h-[24px] w-[80px] rounded-md"></p>
              <p className="bg-shine h-[14px] w-[46px] rounded-md"></p>
            </div>
          </div>
        </div>
        {/* card footer => Follow, Message */}
        <div className="flex w-full flex-row justify-center gap-4 py-4 px-6 border-t border-grey-cold/50 user-card-footer-gradient-bg">
          <p className="bg-shine h-[35px] w-[100px] rounded-md"></p>
          <p className="bg-shine h-[35px] w-[100px] rounded-md"></p>
        </div>
      </div>
    );
  }
  if (type === "ProfileCardDesktop") {
    return (
      <div className="w-full relative shadow-light rounded-xl flex flex-col bg-white border border-content-border">
        <div className="absolute top-10 left-6 w-[120px] h-[120px] rounded-full border-[5px] border-white shadow-avatar">
          <div className="icon bg-shine w-full h-full rounded-full"></div>
        </div>
        {/* gradient upper part of the card */}
        <div className="w-full h-16 bg-shine" />
        {/* card content */}
        <div className="w-full flex flex-col bg-white gap-6 py-6 pr-6 pl-[170px]">
          {/* upper info */}
          <div className="w-full flex flex-col gap-2">
            {/* full name */}
            <p className="bg-shine h-[30px] w-[227px] rounded-md"></p>
            {/* location and username */}
            <div className="flex w-full flex-col gap-3">
              <p className="bg-shine h-[19px] w-[159px] rounded-md"></p>
            </div>
            {/* department */}
            <div className="bg-shine py-[6px] px-3 rounded-xl text-center max-w-fit">
              <p className="bg-shine h-[28px] w-[129px] rounded-md"></p>
            </div>
          </div>
          {/* post statistics */}
          <div className="flex flex-row gap-6">
            <div className="flex flex-col items-center gap-[2px]">
              <p className="bg-shine h-[24px] w-[80px] rounded-md"></p>
              <p className="bg-shine h-[14px] w-[46px] rounded-md"></p>
            </div>
            <div className="flex flex-col items-center gap-[2px]">
              <p className="bg-shine h-[24px] w-[80px] rounded-md"></p>
              <p className="bg-shine h-[14px] w-[46px] rounded-md"></p>
            </div>
          </div>
        </div>
        {/* card footer => Follow, Message */}
        <div className="flex w-full flex-row gap-4 py-4 px-6 border-t border-grey-cold/50 user-card-footer-gradient-bg">
          <p className="bg-shine h-[35px] w-[100px] rounded-md"></p>
          <p className="bg-shine h-[35px] w-[100px] rounded-md"></p>
        </div>
      </div>
    );
  }
};

export default LoadingSkeleton;

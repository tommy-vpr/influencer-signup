import { Play } from "lucide-react";
import React from "react";
import VideoModal from "@/components/my-components/VideoModal"; // Adjust import path based on your folder structure

type Props = {
  number: number;
};

const ContentBlock = ({ number }: Props) => (
  <div className="rounded-lg shadow-md bg-gray-50 dark:bg-[#141414] flex overflow-hidden">
    <div className="p-8 flex items-center justify-center text-4xl bg-gray-100 dark:bg-[#222] aspect-square">
      {number}
    </div>
    <div className="p-8">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas dolorem
        beatae, doloremque laborum accusantium labore similique, sapiente amet
        culpa expedita fuga necessitatibus reiciendis, blanditiis voluptatibus
        earum laboriosam modi quae consequuntur.
      </p>
      <VideoModal />
    </div>
  </div>
);

const Page = () => {
  return (
    <div className="flex flex-col gap-8 w-2/3 mx-auto">
      {[1, 2, 3, 4].map((number) => (
        <ContentBlock key={number} number={number} />
      ))}
    </div>
  );
};

export default Page;

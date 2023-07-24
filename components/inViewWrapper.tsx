"use client";

import { InView } from "react-intersection-observer";

export default function AnimationOnScroll({
  children,
  classNameInView,
  classNameNotInView,
}: {
  children: React.ReactNode;
  classNameInView: string;
  classNameNotInView: string;
}) {
  return (
    <InView triggerOnce threshold={1}>
      {({ inView, ref, entry }) => (
        <div
          ref={ref}
          className={inView ? classNameInView : classNameNotInView}
        >
          <div className="mx-auto flex w-[300px] p-5 text-center text-2xl font-bold text-white md:m-auto md:w-[500px] md:p-0 md:text-right md:text-7xl">
            Hear what our students have to say
          </div>
        </div>
      )}
    </InView>
  );
}

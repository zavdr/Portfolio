import AnimatedSphere from "@/components/AnimatedSphere";

export default function HeroSphereLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 hidden h-[380px] w-screen -translate-x-1/2 overflow-visible lg:block xl:h-[420px]"
    >
      <div className="relative mx-auto h-full w-full max-w-[1180px] px-6 sm:px-8">
        <div className="absolute right-0 top-[46%] -translate-y-1/2 translate-x-[5.5rem] xl:translate-x-[7.5rem] 2xl:translate-x-[8.5rem]">
          <AnimatedSphere size="desktop" />
        </div>
      </div>
    </div>
  );
}

export default function Sneaker360({ image }) {
  return (
    <div className="w-[100%] h-[100%] md:w-[125%] md:h-[125%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img 
        src={image}
        alt="Premium Floating Sneaker Focus"
        className="w-full h-full object-contain object-center drop-shadow-[0_45px_45px_rgba(0,0,0,0.85)] brightness-[1.02] contrast-[1.05]"
      />
    </div>
  );
}

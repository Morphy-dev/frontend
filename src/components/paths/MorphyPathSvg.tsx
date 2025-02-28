import { forwardRef } from "react";
interface MorphyPathSvgProps extends React.SVGProps<SVGSVGElement> {}

const MorphyPathSvg = forwardRef<SVGSVGElement, MorphyPathSvgProps>(({ style, ...props }, ref) => {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", ...style }}
    {...props} ref={ref} width="848" height="138" viewBox="0 0 848 138" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.77493 75.0279C4.77493 60.0732 60.5152 4.33286 159.76 4.33286C259.005 4.33286 348.733 123.971 420.788 123.971C492.842 123.971 571.695 4.33286 673.659 4.33286C775.623 4.33286 843.599 54.6351 843.599 75.0279C843.599 95.4207 806.892 133.487 673.659 133.487C540.426 133.487 551.302 34.2423 420.788 34.2423C290.274 34.2423 288.915 123.971 159.76 123.971C30.6058 123.971 4.77493 89.9826 4.77493 75.0279Z" stroke="#F168B6" stroke-width="8"/>
    </svg>
    
  );
});

export default MorphyPathSvg;



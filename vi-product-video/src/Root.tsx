import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VIProductDemo"
        component={Video}
        durationInFrames={6240} // ~3:28 @ 30fps (450+300+360+360+240+300+750+900+600+540+90+150+150+150+90+510+300)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

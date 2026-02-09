import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import { Composition } from "remotion";
import { Video } from "./Video";
import { TOTAL_VIDEO_FRAMES } from "./config/voiceover";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VIProductDemo"
        component={Video}
        durationInFrames={TOTAL_VIDEO_FRAMES} // ~4:48 @ 30fps - extended for actual voiceover durations + StackedCardsScene
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

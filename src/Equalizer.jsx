import "./equalizer.css";

export default function Equalizer({ isPlaying }) {
  return (
    <div className="equalizer">
      {[1, 2, 3, 4, 5].map((bar) => (
        <span
          key={bar}
          className={`bar ${isPlaying ? "playing" : ""}`}
        ></span>
      ))}
    </div>
  );
}

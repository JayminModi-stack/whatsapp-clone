import Picker from "emoji-picker-react";

export default function EmojiPicker({ setMessage }) {
  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div style={{ position: "absolute", bottom: "70px" }}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}

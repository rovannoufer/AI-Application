const accessToken = "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"; 

async function image() {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "POST",
      body: JSON.stringify({
        "inputs": "A group of people in the 90s era wearing baggy jeans, flannel shirts, denim jackets, and windbreakers. They have hairstyles like high ponytails with scrunchies, curtain hairstyles, and spiked hair. Accessories include fanny packs, chokers, and slap bracelets. The background features a retro scene with a portable CD player and a Game Boy."
      })
    }
  );
  const result = await response.blob();
  const answer = URL.createObjectURL(result);
  return answer
}



image();



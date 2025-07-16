function main() {
  console.log("Completion Marker Plugin loaded!");

  // Format date as "[[Jul 7th, 2025]]"
  function formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";
    
    return `[[${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}]]`;
  }

  // Process block changes
  logseq.DB.onChanged(async ({ blocks }) => {
    for (const block of blocks) {
      try {
        const content = block.content || "";
        const isChecked = content.startsWith("DONE ") || 
                         content.startsWith("- [x]") || 
                         /^TODO .*[✔✓]/.test(content);
        
        const completionRegex = /\[\[[A-Za-z]{3} \d{1,2}(?:st|nd|rd|th), \d{4}\]\] #Done$/;
        const hasCompletionMarker = completionRegex.test(content);

        if (isChecked && !hasCompletionMarker) {
          const today = new Date();
          const updatedContent = `${content.trim()} ${formatDate(today)} #Done`;
          await logseq.Editor.updateBlock(block.uuid, updatedContent);
        } 
        else if (!isChecked && hasCompletionMarker) {
          const cleanContent = content.replace(completionRegex, "").trim();
          await logseq.Editor.updateBlock(block.uuid, cleanContent);
        }
      } catch (error) {
        console.error("Error processing block:", error);
      }
    }
  });
}

logseq.ready({
  name: "Completion Marker",
  desc: "Automatically marks completed tasks with date and #Done tag",
  icon: "./logo.jpg",  // Changed from .png to .jpg
}).then(main).catch(console.error);
export default function parseLyrics(lyrics) {
    const lines = lyrics.split('\n');
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\] (.+)/);
      
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseFloat(match[2]);
        const content = match[3];
        const startTime = (minutes * 60 + seconds) * 1000;
        
        let endTime;
        if (i < lines.length - 1) {
          const nextLine = lines[i + 1];
          const nextMatch = nextLine.match(/\[(\d{2}):(\d{2}\.\d{2})\]/);
          
          if (nextMatch) {
            const nextMinutes = parseInt(nextMatch[1], 10);
            const nextSeconds = parseFloat(nextMatch[2]);
            endTime = (nextMinutes * 60 + nextSeconds) * 1000;
          }
        }
        
        if (endTime === undefined) {
          endTime = 100000000;
        }
        
        result.push({
          startTime,
          endTime,
          content
        });
      }
    }    
    return result;
  }
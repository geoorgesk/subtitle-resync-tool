function shiftTimecode(time, seconds) {
  const [h, m, s] = time.split(/[:,]/);
  let total =
    parseInt(h) * 3600 +
    parseInt(m) * 60 +
    parseFloat(s.replace(',', '.')) +
    parseFloat(seconds);

  total = Math.max(0, total);
  const hh = String(Math.floor(total / 3600)).padStart(2, '0');
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const ss = String((total % 60).toFixed(3)).padStart(6, '0');
  return `${hh}:${mm}:${ss.replace('.', ',')}`;
}

function shiftSubtitles() {
  const fileInput = document.getElementById('srtFile');
  const shift = parseFloat(document.getElementById('shiftSeconds').value);
  const outputName = document.getElementById('outputName').value || 'shifted_subs.srt';

  if (!fileInput.files.length || isNaN(shift)) {
    alert('Please upload a .srt file and enter a valid shift time.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    const shifted = lines.map(line => {
      if (line.includes('-->')) {
        const [start, end] = line.split(' --> ');
        return `${shiftTimecode(start.trim(), shift)} --> ${shiftTimecode(end.trim(), shift)}`;
      }
      return line;
    }).join('\n');

    const blob = new Blob([shifted], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = outputName;
    link.click();
  };

  reader.readAsText(file);
}

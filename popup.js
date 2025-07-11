
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('transcript', (data) => {
    document.getElementById('transcript').value = data.transcript || '';
  });

  document.getElementById('summarize').addEventListener('click', async () => {
    const text = document.getElementById('transcript').value;

    const summary = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_KEY'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Summarize this Google Meet transcript clearly and concisely.' },
          { role: 'user', content: text }
        ]
      })
    }).then(res => res.json());

    document.getElementById('summary').innerText = summary.choices[0].message.content;
  });
});
